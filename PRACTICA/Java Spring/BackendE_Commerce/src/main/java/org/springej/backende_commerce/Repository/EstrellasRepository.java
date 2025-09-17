package org.springej.backende_commerce.Repository;

import org.springej.backende_commerce.Model.Estrellas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstrellasRepository extends JpaRepository<Estrellas, Long> {
}
