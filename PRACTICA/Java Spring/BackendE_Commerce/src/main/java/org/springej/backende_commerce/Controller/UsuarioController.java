package org.springej.backende_commerce.Controller;

import org.springej.backende_commerce.Model.Usuario;
import org.springej.backende_commerce.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("guardarUsuario")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardarUsuario(usuario);
    }

    @GetMapping("buscarPorNombre")
    public Optional<Usuario> buscarPorNombre(@RequestParam String nombre){
        return usuarioService.buscarUsuarioPorNombre(nombre);
    }

    @GetMapping("listarUsuarios")
    public List<Usuario> listarUsuarios(){
        return usuarioService.listarUsuarios();
    }

    @DeleteMapping("borrarUsuario")
    public void borrarUsuario(@RequestBody Usuario usuario){
        usuarioService.borrarUsuario(usuario);
    }
}
