package org.springej.backende_commerce.Repository;

import org.springej.backende_commerce.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

//    // Buscar por nombre parcial (ignorando mayúsculas/minúsculas)
//    List<Producto> findByNombreContainingIgnoreCase(String nombre);
//
//    // Buscar por descripción parcial (ignorando mayúsculas/minúsculas)
//    List<Producto> findByDescripcionContainingIgnoreCase(String descripcion);
//
//    // Buscar por rango de precios
//    List<Producto> findByPrecioBetween(double precioMin, double precioMax);
//
//    // Buscar por precio mayor o igual
//    List<Producto> findByPrecioGreaterThanEqual(double precio);
//
//    // Buscar por precio menor o igual
//    List<Producto> findByPrecioLessThanEqual(double precio);
//
//    // Productos ordenados por precio descendente (más caros primero)
//    List<Producto> findTopByOrderByPrecioDesc();
//
//    // Productos ordenados por precio ascendente (más baratos primero)
//    List<Producto> findTopByOrderByPrecioAsc();
//
//    // Query personalizada para búsqueda por múltiples criterios
//    @Query("SELECT p FROM Producto p WHERE " +
//            "(:nombre IS NULL OR LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
//            "(:precioMin IS NULL OR p.precio >= :precioMin) AND " +
//            "(:precioMax IS NULL OR p.precio <= :precioMax)")
//    List<Producto> findByMultipleCriteria(
//            @Param("nombre") String nombre,
//            @Param("precioMin") Double precioMin,
//            @Param("precioMax") Double precioMax);
//
//    // Buscar por nombre o descripción
//    @Query("SELECT p FROM Producto p WHERE " +
//            "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :texto, '%')) OR " +
//            "LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :texto, '%'))")
//    List<Producto> findByNombreOrDescripcion(@Param("texto") String texto);
//
//    // Calcular precio promedio
//    @Query("SELECT AVG(p.precio) FROM Producto p")
//    Double calcularPrecioPromedio();
//
//    // Contar productos por rango de precio
//    @Query("SELECT COUNT(p) FROM Producto p WHERE p.precio BETWEEN :precioMin AND :precioMax")
//    long countByPrecioRange(@Param("precioMin") double precioMin, @Param("precioMax") double precioMax);
//
//    // Buscar productos con precio mayor al promedio
//    @Query("SELECT p FROM Producto p WHERE p.precio > (SELECT AVG(pr.precio) FROM Producto pr)")
//    List<Producto> findProductosCaros();
//
//    // Buscar productos con precio menor al promedio
//    @Query("SELECT p FROM Producto p WHERE p.precio < (SELECT AVG(pr.precio) FROM Producto pr)")
//    List<Producto> findProductosBaratos();
//
//    // Top 5 productos más caros
//    @Query("SELECT p FROM Producto p ORDER BY p.precio DESC LIMIT 5")
//    List<Producto> findTop5MasCaros();
//
//    // Top 5 productos más baratos
//    @Query("SELECT p FROM Producto p ORDER BY p.precio ASC LIMIT 5")
//    List<Producto> findTop5MasBaratos();
}