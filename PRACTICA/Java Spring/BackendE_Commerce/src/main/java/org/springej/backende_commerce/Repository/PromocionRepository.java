package org.springej.backende_commerce.Repository;

import org.springej.backende_commerce.Model.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromocionRepository extends JpaRepository<Promocion,Long> {
}
