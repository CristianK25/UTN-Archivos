package org.springej.backende_commerce.Controller;


import lombok.RequiredArgsConstructor;
import org.springej.backende_commerce.DTO.JwtResponse;
import org.springej.backende_commerce.DTO.LoginRequest;
import org.springej.backende_commerce.DTO.RegisterRequest;
import org.springej.backende_commerce.Model.Rol;
import org.springej.backende_commerce.Model.Usuario;
import org.springej.backende_commerce.Repository.RolRepository;
import org.springej.backende_commerce.Repository.UsuarioRepository;
import org.springej.backende_commerce.Service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2) Obtener UserDetails “real” (viene del CustomUserDetailsService)
        UserDetails user = (UserDetails) authentication.getPrincipal();

        // 3) Generar JWT
        String token = jwtService.generateToken(user);

        // 4) Extraer roles para devolverlos al front
        List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        // 5) Responder
        return ResponseEntity.ok(new JwtResponse(token, user.getUsername(), roles));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        //se verifica que no exista usuario con ese mail
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("El usuario que ingreso ya existe.");
        }
        //Se crea un nuevo usuario con constrasenia encrip[tada
        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        //se le asigna rol USER por defecto
        Rol rol = rolRepository.findByNombre("USER")
                .orElseThrow(()-> new RuntimeException("Rol USER no encontrado"));

        usuario.getRoles().add(rol);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuario registrado correctamente");
    }
}