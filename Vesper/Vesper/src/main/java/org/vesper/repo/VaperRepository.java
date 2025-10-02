package org.vesper.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vesper.entity.Vaper;

@Repository
public interface VaperRepository extends JpaRepository<Vaper, Long>{
}
