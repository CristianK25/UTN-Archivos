package org.springej.backende_commerce.Repository;

import org.springej.backende_commerce.Model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {

    // Buscar ventas por usuario, ordenadas por fecha descendente
    List<Venta> findByUsuarioIdOrderByFechaVentaDesc(Long idUsuario);

    // Contar ventas por usuario
    long countByUsuarioId(Long idUsuario);

    // Ventas de hoy
    @Query("SELECT v FROM Venta v WHERE v.fechaVenta = CURRENT_DATE ORDER BY v.id DESC")
    List<Venta> findVentasDeHoy();

    // traer venta con items y productos en una sola consulta
    @Query("select v from Venta v " +
            "left join fetch v.productos pv " +
            "left join fetch pv.producto p " +
            "where v.id = :id")
    Optional<Venta> findByIdWithItems(@Param("id") Long id);
}