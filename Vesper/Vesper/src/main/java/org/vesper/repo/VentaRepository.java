package org.vesper.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vesper.entity.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
}
