package org.vesper.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vesper.entity.Producto;

@Repository
public interface ProductoRepository  extends JpaRepository<Producto,Long> {
}
