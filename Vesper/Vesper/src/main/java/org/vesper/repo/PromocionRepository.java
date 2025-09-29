package org.vesper.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vesper.entity.Promocion;

@Repository
public interface PromocionRepository  extends JpaRepository<Promocion,Long> {
}
