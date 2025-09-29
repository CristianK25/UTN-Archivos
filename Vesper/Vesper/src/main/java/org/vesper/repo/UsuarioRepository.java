package org.vesper.repo;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.vesper.entity.Usuario;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario,Long> {
}
