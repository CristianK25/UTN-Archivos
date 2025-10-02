package org.vesper.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vesper.entity.Perfume;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
}
