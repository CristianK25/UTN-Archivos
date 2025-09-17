package org.springej.backende_commerce.Repository;

import org.springej.backende_commerce.Model.AuditoriaProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditoriaProductoRepository extends JpaRepository<AuditoriaProducto, Long> {
}