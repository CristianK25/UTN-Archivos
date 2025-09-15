import entity.*;
import repo.InMemoryRepository;

import java.util.*;


public class Main {
    public static void main(String[] args) {
        InMemoryRepository<Categoria> categoriaRepository = new InMemoryRepository<>();
        InMemoryRepository<ArticuloInsumo> articuloInsumoRepository = new InMemoryRepository<>();
        InMemoryRepository<ArticuloManufacturado> articuloManufacturadoRepository = new InMemoryRepository<>();
        InMemoryRepository<UnidadMedida> unidadMedidaRepository = new InMemoryRepository<>();
        InMemoryRepository<ArticuloManufacturadoDetalle> articuloManufacturadoDetalleRepository = new InMemoryRepository<>();

        //Crear las categorías Pizzas, Sandwich, Lomos, Insumos
        String[] categorias = {"Pizzas","Sandwich","Lomos","Insumos"};
        for(String categoriaString: categorias) {
            Categoria cat = Categoria.builder()
                    .denominacion(categoriaString)
                    .build();
            categoriaRepository.save(cat);
        }

        //Crear como unidad de medida Kilogramos, Litros y gramos.
        String[] unidadesMedida = {"Kilogramos", "Litros", "Gramos"};
        for(String unidadString: unidadesMedida) {
            UnidadMedida unidadMedida = UnidadMedida.builder()
                    .denominacion(unidadString)
                    .build();
            unidadMedidaRepository.save(unidadMedida);
        }

        //Crear los siguientes Artículos Insumos: sal, aceite, carne y harina. Tener en cuenta en colocar como true el atributo esparaElaborar.
        Categoria insumos = categoriaRepository
                .genericFindByField("denominacion", "Insumos")
                .get(0); // tomar el primero
        String[] nombres = {"sal", "aceite","carne","harina"};
        double[] precios = {1.0, 0.5, 3.0, 5.0};
        int[] stockActual = {100, 50, 30, 20};
        int[] stockMaximo = {200, 100, 60, 40};
        for (int i = 0; i < nombres.length; i++) {
            ArticuloInsumo articulo = ArticuloInsumo.builder()
                    .denominacion(nombres[i])
                    .precioCompra(precios[i])
                    .stockActual(stockActual[i])
                    .stockMaximo(stockMaximo[i])
                    .esParaElaborar(true)
                    .categoria(insumos)
                    .build();

            articuloInsumoRepository.save(articulo);
        }

        //Crear Imagenes para 3 Pizzas y 3 Lomos
        String[] nombresArticulos = {"HawainaPizza1","HawainaPizza2","HawainaPizza3","LomoCompletoLomo1","LomoCompletoLomo2","LomoCompletoLomo3"};
        for (String nombresArticulo : nombresArticulos) {
            Imagen img = Imagen.builder()
                    .denominacion(nombresArticulo)
                    .build();
        }


        //Ahora hay que pensar en crear el detalle de Los Artpiculos Manufacturados, tomaremos como ejemplo la asignación de sólo un insumo por detalle.
        ArticuloInsumo sal = articuloInsumoRepository.genericFindByField("denominacion", "sal").get(0);
        ArticuloInsumo harina = articuloInsumoRepository.genericFindByField("denominacion", "harina").get(0);
        ArticuloInsumo aceite = articuloInsumoRepository.genericFindByField("denominacion", "aceite").get(0);
        ArticuloInsumo carne = articuloInsumoRepository.genericFindByField("denominacion", "carne").get(0);

        ArticuloManufacturadoDetalle detallePizzaHawaina1 = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(sal)
                .build();

        ArticuloManufacturadoDetalle detallePizzaHawaina2 = ArticuloManufacturadoDetalle.builder()
                .cantidad(2)
                .articuloInsumo(harina)
                .build();

        ArticuloManufacturadoDetalle detallePizzaHawaina3 = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(aceite)
                .build();

        ArticuloManufacturadoDetalle detalleLomoCompleto1 = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(sal)
                .build();

        ArticuloManufacturadoDetalle detalleLomoCompleto2 = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(aceite)
                .build();

        ArticuloManufacturadoDetalle detalleLomoCompleto3 = ArticuloManufacturadoDetalle.builder()
                .cantidad(1)
                .articuloInsumo(carne)
                .build();

        articuloManufacturadoDetalleRepository.save(detallePizzaHawaina1);
        articuloManufacturadoDetalleRepository.save(detallePizzaHawaina2);
        articuloManufacturadoDetalleRepository.save(detallePizzaHawaina3);
        articuloManufacturadoDetalleRepository.save(detalleLomoCompleto1);
        articuloManufacturadoDetalleRepository.save(detalleLomoCompleto2);
        articuloManufacturadoDetalleRepository.save(detalleLomoCompleto3);

//Ahora a crear los productos manufacturados relacionándolos a su imagen y su correspondiente línea de detalle. Solamente crearemos Pizza Hawaina y Lomo Competo
//// Crear el Articulo Manufacturado Pizza Hawaina e incorporarle sus atributos, las tres primera imágenes y los tres primeros detalle de artículos manufacturados.
//// Al Lomo completo las imágenes correspondiente y sus líneas de detalle.


        // --- Traer todos los detalles y ordenarlos por ID (para tener un orden predecible) ---
        List<ArticuloManufacturadoDetalle> todosLosDetalles = new ArrayList<>(articuloManufacturadoDetalleRepository.getData().values());
        todosLosDetalles.sort(Comparator.comparingLong(ArticuloManufacturadoDetalle::getId)); // ordenar por ID

        // Asignar los tres primeros detalles a Pizza Hawaina y los otros tres al Lomo Completo
        Set<ArticuloManufacturadoDetalle> detallesPizza = new HashSet<>(todosLosDetalles.subList(0, 3));
        Set<ArticuloManufacturadoDetalle> detallesLomo = new HashSet<>(todosLosDetalles.subList(3, 6));

        List<Imagen> todasLasImagenes = new ArrayList<>();
        for (String nombreArticulo : nombresArticulos) {
            Imagen img = Imagen.builder()
                    .denominacion(nombreArticulo)
                    .build();
            todasLasImagenes.add(img); // guardamos la imagen en la lista
        }

        // Asignar las imágenes a cada producto
        Set<Imagen> imagenesPizza = new HashSet<>(todasLasImagenes.subList(0, 3));
        Set<Imagen> imagenesLomo = new HashSet<>(todasLasImagenes.subList(3, 6));

        ArticuloManufacturado pizzaHawaina = ArticuloManufacturado.builder()
                .descripcion("Pizza Hawaina")
                .tiempoEstimadoMinutos(15)
                .preparacion("Preparacion Pizza Hawaina")
                .detalles(Set.of())
                .imagenes(imagenesPizza)
                .precioVenta(25.5)
                .categoria(categoriaRepository.genericFindByField("denominacion", "Pizzas").get(0))
                .build();
        ArticuloManufacturado lomoCompleto = ArticuloManufacturado.builder()
                .descripcion("Lomo Completo")
                .tiempoEstimadoMinutos(20)
                .preparacion("Preparacion lomo completo")
                .detalles(Set.of())
                .imagenes(imagenesLomo)
                .precioVenta(30.5)
                .categoria(categoriaRepository.genericFindByField("denominacion", "Lomos").get(0))
                .build();

// TODO 5-El desarrollo del programa a realizar debe permitir obtener los siguientes resultados durante su ejecución.

//        a.	Mostrar todas las catgorías.
        Collection<Categoria> todasCategorias = categoriaRepository.getData().values();
        for (Categoria cat : todasCategorias) {
            System.out.println(cat);
        }
//        b.	Mostrar todos los Artículos que son insumos
        List<ArticuloInsumo> articulosinsumos = (List<ArticuloInsumo>) articuloInsumoRepository.getData().values();
        articulosinsumos.forEach(System.out::println);
//        c.	Mostrar todos los Artículos que son Manufacturados
        List<ArticuloManufacturado> articulosmanufacturados = (List<ArticuloManufacturado>) articuloManufacturadoRepository.getData().values();
        articulosmanufacturados.forEach(System.out::println);
//        d.	Buscar un  Artículo Manufacturado por Id.
        System.out.println(articuloManufacturadoRepository.findById(1L));
//        e.	Actualizar un  Artículo Manufacturado por Id.
        articuloManufacturadoRepository.genericUpdate(1L, pizzaHawaina);

    }
}
