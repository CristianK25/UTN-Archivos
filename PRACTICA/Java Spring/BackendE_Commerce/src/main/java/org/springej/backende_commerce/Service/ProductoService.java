package org.springej.backende_commerce.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springej.backende_commerce.Model.AuditoriaProducto;
import org.springej.backende_commerce.Model.Producto;
import org.springej.backende_commerce.Repository.AuditoriaProductoRepository;
import org.springej.backende_commerce.Repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ProductoService {

    private static final Logger logger = LoggerFactory.getLogger(ProductoService.class);

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private AuditoriaProductoRepository auditoriaRepository;

    // Listar todos los productos
    public List<Producto> listarTodos() {
        logger.info("Consultando todos los productos en la base de datos");
        List<Producto> productos = productoRepository.findAll();
        logger.info("Se obtuvieron {} productos de la base de datos", productos.size());
        return productos;
    }

    // Buscar producto por ID
    public Optional<Producto> buscarPorId(Long id) {
        logger.info("Buscando producto en base de datos con ID: {}", id);
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            logger.info("Producto encontrado en base de datos: {}", producto.get().getNombre());
        } else {
            logger.info("Producto con ID {} no existe en la base de datos", id);
        }
        return producto;
    }

    // Guardar producto (crear o actualizar)
    public Producto guardar(Producto producto) {
        boolean esNuevo = producto.getId() == null;
        String accion = esNuevo ? "CREAR" : "ACTUALIZAR";

        logger.info("Guardando producto en base de datos: {} ({})", producto.getNombre(), accion);

        try {
            Producto productoGuardado = productoRepository.save(producto);

            String detalle = String.format("ID: %d, Nombre: %s, Precio: %.2f",
                    productoGuardado.getId(), productoGuardado.getNombre(), productoGuardado.getPrecio());

            guardarAuditoria(accion, detalle);

            logger.info("Producto {} exitosamente con ID: {}",
                    esNuevo ? "creado" : "actualizado", productoGuardado.getId());

            return productoGuardado;

        } catch (Exception e) {
            logger.error("Error al guardar producto {}: {}", producto.getNombre(), e.getMessage());
            guardarAuditoria(accion + "_ERROR",
                    "Error al " + accion.toLowerCase() + " producto: " + e.getMessage());
            throw e;
        }
    }

    // Eliminar producto por ID
    public void eliminar(Long id) {
        logger.info("Eliminando producto con ID: {}", id);

        try {
            Optional<Producto> producto = buscarPorId(id);
            if (producto.isPresent()) {
                productoRepository.deleteById(id);

                String detalle = String.format("ID: %d, Nombre: %s eliminado",
                        id, producto.get().getNombre());
                guardarAuditoria("ELIMINAR", detalle);

                logger.info("Producto con ID {} eliminado exitosamente de la base de datos", id);
            } else {
                logger.warn("Intento de eliminar producto inexistente con ID: {}", id);
            }

        } catch (Exception e) {
            logger.error("Error al eliminar producto con ID {}: {}", id, e.getMessage());
            guardarAuditoria("ELIMINAR_ERROR",
                    "Error al eliminar producto ID " + id + ": " + e.getMessage());
            throw e;
        }
    }

    // Actualización parcial de un producto
    public Optional<Producto> actualizarParcial(Long id, Map<String, Object> campos) {
        logger.info("Actualizando parcialmente producto con ID: {}", id);
        logger.debug("Campos a actualizar: {}", campos);

        try {
            return productoRepository.findById(id).map(producto -> {
                StringBuilder cambiosRealizados = new StringBuilder();

                campos.forEach((campo, valor) -> {
                    Field field = ReflectionUtils.findField(Producto.class, campo);
                    if (field != null) {
                        field.setAccessible(true);
                        Object valorAnterior = ReflectionUtils.getField(field, producto);

                        // Conversión de tipos para campos específicos
                        if (campo.equals("precio") && valor instanceof Number) {
                            valor = ((Number) valor).doubleValue();
                        }

                        ReflectionUtils.setField(field, producto, valor);

                        cambiosRealizados.append(String.format("%s: %s -> %s; ",
                                campo, valorAnterior, valor));
                    }
                });

                Producto productoActualizado = productoRepository.save(producto);

                String detalle = String.format("ID: %d, Cambios: %s",
                        id, cambiosRealizados.toString());
                guardarAuditoria("ACTUALIZAR_PARCIAL", detalle);

                logger.info("Producto actualizado parcialmente: {}", cambiosRealizados.toString());

                return productoActualizado;
            });

        } catch (Exception e) {
            logger.error("Error en actualización parcial del producto ID {}: {}", id, e.getMessage());
            guardarAuditoria("ACTUALIZAR_PARCIAL_ERROR",
                    "Error en actualización parcial ID " + id + ": " + e.getMessage());
            throw e;
        }
    }

    // Verificar si un producto existe
    public boolean existePorId(Long id) {
        logger.debug("Verificando existencia del producto con ID: {}", id);
        boolean existe = productoRepository.existsById(id);
        logger.debug("Producto con ID {} {}", id, existe ? "existe" : "no existe");
        return existe;
    }

    // Contar total de productos
    public long contarProductos() {
        logger.info("Contando total de productos en la base de datos");
        long total = productoRepository.count();
        logger.info("Total de productos en base de datos: {}", total);
        return total;
    }

    // Método privado para guardar auditoría
    private void guardarAuditoria(String accion, String detalle) {
        try {
            AuditoriaProducto auditoria = new AuditoriaProducto();
            auditoriaRepository.save(auditoria);
            logger.debug("Registro de auditoría guardado: {} - {}", accion, detalle);
        } catch (Exception e) {
            logger.error("Error al guardar auditoría para acción {}: {}", accion, e.getMessage());
            // No relanzamos la excepción para no afectar la operación principal
        }
    }
}