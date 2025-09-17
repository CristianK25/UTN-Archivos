package org.springej.backende_commerce.Service;

import org.springej.backende_commerce.Model.*;
import org.springej.backende_commerce.Repository.*;
import org.springej.backende_commerce.DTO.VentaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
@Transactional
public class VentaService {

    private static final Logger logger = LoggerFactory.getLogger(VentaService.class);

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ProductoVentaRepository productoVentaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private PromocionRepository promocionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Registra una nueva venta con sus productos
     */
    public Venta registrarVenta(VentaDTO ventaDTO) {
        logger.info("Iniciando proceso de registro de venta para usuario ID: {}", ventaDTO.getIdUsuario());

        // 1. Validar que el usuario existe
        Usuario usuario = usuarioRepository.findById(ventaDTO.getIdUsuario())
                .orElseThrow(() -> {
                    logger.error("Usuario con ID {} no encontrado", ventaDTO.getIdUsuario());
                    return new IllegalArgumentException("Usuario no encontrado con ID: " + ventaDTO.getIdUsuario());
                });

        logger.debug("Usuario encontrado: {}", usuario.getId());

        // 2. Crear y guardar la venta
        Venta venta = new Venta();
        venta.setUsuario(usuario);
        venta.setFechaVenta(ventaDTO.getFechaVenta());

        venta = ventaRepository.save(venta);
        logger.debug("Venta creada con ID: {}", venta.getId());

        // 3. Procesar cada producto de la venta
        for (VentaDTO.ProductoVentaDTO productoDTO : ventaDTO.getProductos()) {
            logger.debug("Procesando producto ID: {} con cantidad: {}",
                    productoDTO.getIdProducto(), productoDTO.getCantidadProductoVenta());

            // Validar que el producto existe
            Producto producto = productoRepository.findById(productoDTO.getIdProducto())
                    .orElseThrow(() -> {
                        logger.error("Producto con ID {} no encontrado", productoDTO.getIdProducto());
                        return new IllegalArgumentException("Producto no encontrado con ID: " + productoDTO.getIdProducto());
                    });

            // Validar promoción si se especifica
            Promocion promocion = null;
            if (productoDTO.getIdPromocion() != null) {
                promocion = promocionRepository.findById(productoDTO.getIdPromocion())
                        .orElseThrow(() -> {
                            logger.error("Promoción con ID {} no encontrada", productoDTO.getIdPromocion());
                            return new IllegalArgumentException("Promoción no encontrada con ID: " + productoDTO.getIdPromocion());
                        });
                logger.debug("Promoción aplicada: {}", promocion.getId());
            }

            // Crear registro en ProductoVenta
            ProductoVenta productoVenta = new ProductoVenta();
            productoVenta.setVenta(venta);
            productoVenta.setProducto(producto);
            productoVenta.setPromocion(promocion);
            productoVenta.setCantidadProductoVenta(productoDTO.getCantidadProductoVenta());

            productoVentaRepository.save(productoVenta);

            logger.debug("ProductoVenta guardado: {} x {} unidades",
                    producto.getNombre(), productoDTO.getCantidadProductoVenta());
        }

        logger.info("Venta registrada exitosamente. ID: {}, Usuario: {}, Productos: {}",
                venta.getId(), usuario.getId(), ventaDTO.getTotalProductos());

        return venta;
    }

    /**
     * Obtiene todas las ventas de un usuario específico
     */
    @Transactional(readOnly = true)
    public List<Venta> obtenerVentasPorUsuario(Long idUsuario) {
        logger.info("Buscando todas las ventas para usuario ID: {}", idUsuario);

        // Validar que el usuario existe
        if (!usuarioRepository.existsById(idUsuario)) {
            logger.warn("Usuario con ID {} no existe", idUsuario);
            throw new IllegalArgumentException("Usuario no encontrado con ID: " + idUsuario);
        }

        List<Venta> ventas = ventaRepository.findByUsuarioIdOrderByFechaVentaDesc(idUsuario);
        logger.info("Se encontraron {} ventas para el usuario ID: {}", ventas.size(), idUsuario);

        return ventas;
    }

    /**
     * Método helper para validar si un usuario existe
     */
    @Transactional(readOnly = true)
    public boolean existeUsuario(Long idUsuario) {
        return usuarioRepository.existsById(idUsuario);
    }

    /**
     * Método helper para contar ventas de un usuario
     */
    @Transactional(readOnly = true)
    public long contarVentasPorUsuario(Long idUsuario) {
        logger.debug("Contando ventas para usuario ID: {}", idUsuario);
        return ventaRepository.countByUsuarioId(idUsuario);
    }
}