package org.springej.usuario_tarea.controller;

import org.springej.usuario_tarea.model.Usuario;
import org.springej.usuario_tarea.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("guardarUsuario")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return service.guardarUsuario(usuario);
    }

    @GetMapping("buscarPorNombre")
    public Optional<Usuario> buscarUsuarioPorNombre(@RequestParam String nombre) {
        return service.buscarUsuario(nombre);
    }

    @GetMapping("listar")
    public List<Usuario> listarUsuarios() {
        return service.listarUsuarios();
    }

    @DeleteMapping("borrarUsuario")
    public void borrarUsuario(@RequestBody Usuario usuario) {
        service.borrarUsuario(usuario);
    }
}
