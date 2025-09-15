package org.example;


import org.example.entidades.*;
import org.example.repositorios.InMemoryRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // Inicializar repositorios
        InMemoryRepository<Categoria> categoriaRepository = new InMemoryRepository<>();
        InMemoryRepository<ArticuloInsumo> articuloInsumoRepository = new InMemoryRepository<>();
        InMemoryRepository<ArticuloManufacturado> articuloManufacturadoRepository = new InMemoryRepository<>();
        InMemoryRepository<UnidadMedida> unidadMedidaRepository = new InMemoryRepository<>();

        // Crear categorías
        Categoria pizzas = Categoria.builder().denominacion("Pizzas").esInsumo(false).build();
        Categoria sandwiches = Categoria.builder().denominacion("Sandwiches").esInsumo(false).build();
        Categoria bebidas = Categoria.builder().denominacion("Bebidas").esInsumo(false).build();
        Categoria insumos = Categoria.builder().denominacion("Insumos").esInsumo(true).build();

        categoriaRepository.save(pizzas);
        categoriaRepository.save(sandwiches);
        categoriaRepository.save(bebidas);
        categoriaRepository.save(insumos);

        // Crear unidades de medida
        UnidadMedida kg = UnidadMedida.builder().denominacion("Kg").build();
        UnidadMedida litro = UnidadMedida.builder().denominacion("Litro").build();
        UnidadMedida gramos = UnidadMedida.builder().denominacion("Gramos").build();

        unidadMedidaRepository.save(kg);
        unidadMedidaRepository.save(litro);
        unidadMedidaRepository.save(gramos);

        // Crear artículos insumos
        ArticuloInsumo sal = ArticuloInsumo.builder()
                .denominacion("Sal")
                .precioCompra(1.0)
                .stockActual(100)
                .stockMinimo(10)
                .stockMaximo(200)
                .esParaElaborar(true)
                .unidadMedida(gramos)
                .categoria(insumos)
                .build();

        ArticuloInsumo harina = ArticuloInsumo.builder()
                .denominacion("Harina")
                .precioCompra(0.5)
                .stockActual(50)
                .stockMinimo(5)
                .stockMaximo(100)
                .esParaElaborar(true)
                .unidadMedida(kg)
                .categoria(insumos)
                .build();

        ArticuloInsumo aceite = ArticuloInsumo.builder()
                .denominacion("Aceite")
                .precioCompra(3.0)
                .stockActual(30)
                .stockMinimo(3)
                .stockMaximo(60)
                .esParaElaborar(true)
                .unidadMedida(litro)
                .categoria(insumos)
                .build();

        ArticuloInsumo carne = ArticuloInsumo.builder()
                .denominacion("Carne")
                .precioCompra(5.0)
                .stockActual(20)
                .stockMinimo(2)
                .stockMaximo(40)
                .esParaElaborar(true)
                .unidadMedida(kg)
                .categoria(insumos)
                .build();

        articuloInsumoRepository.save(sal);
        articuloInsumoRepository.save(harina);
        articuloInsumoRepository.save(aceite);
        articuloInsumoRepository.save(carne);

        // Crear imágenes para los artículos
        ImagenArticulo img1 = ImagenArticulo.builder().
                name("HawaianaPizza1").url("http://example.com/pizza1").build();
        ImagenArticulo img2 = ImagenArticulo.builder().name("HawaianaPizza2").url("http://example.com/pizza2").build();
        ImagenArticulo img3 = ImagenArticulo.builder().name("HawaianaPizza3").url("http://example.com/pizza3").build();
        ImagenArticulo img4 = ImagenArticulo.builder().name("LomoCompletoLomo1").url("http://example.com/lomo1").build();
        ImagenArticulo img5 = ImagenArticulo.builder().name("LomoCompletoLomo2").url("http://example.com/lomo2").build();
        ImagenArticulo img6 = ImagenArticulo.builder().name("LomoCompletoLomo3").url("http://example.com/lomo3").build();

        // Crear detalles de artículos manufacturados
        ArticuloManufacturadoDetalle detalle1PizzaHawaina = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(sal)
                .build();

        ArticuloManufacturadoDetalle detalle2PizzaHawaina = ArticuloManufacturadoDetalle.builder()
                .cantidad(2)
                .articuloInsumo(harina)
                .build();

        ArticuloManufacturadoDetalle detalle3PizzaHawaina = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(aceite)
                .build();

        ArticuloManufacturadoDetalle detalle1LomoCompleto = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(sal)
                .build();

        ArticuloManufacturadoDetalle detalle2LomoCompleto = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(aceite)
                .build();

        ArticuloManufacturadoDetalle detalle3LomoCompleto = ArticuloManufacturadoDetalle.builder()
                .cantidad(2)
                .articuloInsumo(carne)
                .build();

        // Crear artículos manufacturados
        ArticuloManufacturado pizzaHawaina = ArticuloManufacturado.builder()
                .denominacion("Pizza Hawaina")
                .precioVenta(12.0)
                .descripcion("Pizza con piña y jamón")
                .tiempoEstimadoMinutos(20)
                .preparacion("Hornear por 20 minutos")
                .categoria(pizzas)
                .unidadMedida(kg)
                .imagenes(new HashSet<>(Set.of(img1, img2, img3)))
                .articuloManufacturadoDetalles(new HashSet<>(Set.of(detalle1PizzaHawaina, detalle2PizzaHawaina, detalle3PizzaHawaina)))
                .build();

        ArticuloManufacturado lomoCompleto = ArticuloManufacturado.builder()
                .denominacion("Lomo Completo")
                .precioVenta(15.0)
                .descripcion("Lomo completo con todos los ingredientes")
                .tiempoEstimadoMinutos(25)
                .preparacion("Cocinar a la parrilla por 25 minutos")
                .categoria(sandwiches)
                .unidadMedida(kg)
                .imagenes(new HashSet<>(Set.of(img4, img5, img6)))
                .articuloManufacturadoDetalles(new HashSet<>(Set.of(detalle1LomoCompleto, detalle2LomoCompleto, detalle3LomoCompleto)))
                .build();

        articuloManufacturadoRepository.save(pizzaHawaina);
        articuloManufacturadoRepository.save(lomoCompleto);

        // Mostrar todas las categorías
        System.out.println("Todas las categorías:");
        List<Categoria> todasLasCategorias = categoriaRepository.findAll();
        todasLasCategorias.forEach(System.out::println);

        // Mostrar todos los artículos insumos
        System.out.println("Todos los artículos insumos:");
        List<ArticuloInsumo> todosLosArticulosInsumos = articuloInsumoRepository.findAll();
        todosLosArticulosInsumos.forEach(System.out::println);

        // Mostrar todos los artículos manufacturados
        System.out.println("Todos los artículos manufacturados:");
        List<ArticuloManufacturado> todosLosArticulosManufacturados = articuloManufacturadoRepository.findAll();
        todosLosArticulosManufacturados.forEach(System.out::println);

        // Buscar un artículo manufacturado por ID
        Optional<ArticuloManufacturado> articuloEncontrado = articuloManufacturadoRepository.findById(1L);
        articuloEncontrado.ifPresent(a -> System.out.println("Artículo manufacturado encontrado por ID 1: " + a));

        // Actualizar un artículo manufacturado por ID
        ArticuloManufacturado pizzaHawainaActualizada = ArticuloManufacturado.builder()

                .id(1L)
                .denominacion("Pizza Hawaina Actualizada")
                .precioVenta(14.0)
                .descripcion("Pizza con piña, jamón y queso extra")
                .tiempoEstimadoMinutos(22)
                .preparacion("Hornear por 22 minutos")
                .categoria(pizzas)
                .unidadMedida(kg)
                .imagenes(new HashSet<>(Set.of(img1, img2, img3)))
                .articuloManufacturadoDetalles(new HashSet<>(Set.of(detalle1PizzaHawaina, detalle2PizzaHawaina, detalle3PizzaHawaina)))
                .build();

        articuloManufacturadoRepository.genericUpdate(1L, pizzaHawainaActualizada);
        Optional<ArticuloManufacturado> articuloVerificado = articuloManufacturadoRepository.findById(1L);
        articuloVerificado.ifPresent(a -> System.out.println("Artículo manufacturado después de la actualización: " + a));

        // Eliminar un artículo manufacturado por ID
        articuloManufacturadoRepository.genericDelete(1L);
        Optional<ArticuloManufacturado> articuloEliminado = articuloManufacturadoRepository.findById(1L);
        if (articuloEliminado.isEmpty()) {
            System.out.println("El artículo manufacturado con ID 1 ha sido eliminado.");
        }

        // Mostrar todos los artículos manufacturados restantes
        System.out.println("Todos los artículos manufacturados restantes:");
        todosLosArticulosManufacturados = articuloManufacturadoRepository.findAll();
        todosLosArticulosManufacturados.forEach(System.out::println);
    }
}
