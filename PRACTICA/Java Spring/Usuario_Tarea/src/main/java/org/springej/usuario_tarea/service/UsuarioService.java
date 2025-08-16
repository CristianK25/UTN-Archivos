package org.springej.usuario_tarea.service;

import org.springej.usuario_tarea.model.Usuario;
import org.springej.usuario_tarea.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarUsuario(String nombre) {
        return usuarioRepository.findByNombre(nombre);
    }

    public void borrarUsuario(Usuario usuario) {
        usuarioRepository.delete(usuario);
    }
}
