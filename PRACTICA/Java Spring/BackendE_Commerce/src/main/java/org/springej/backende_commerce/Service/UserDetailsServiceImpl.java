package org.springej.backende_commerce.Service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springej.backende_commerce.Model.Usuario;
import org.springej.backende_commerce.Repository.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //buscar user en la DB por email
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("Usuario no encontrado " + email));

        //se convierten roles a GrantedAuthority
        List<SimpleGrantedAuthority> authorities = usuario.getRoles()
                .stream()
                .map(rol -> new SimpleGrantedAuthority(rol.getNombre()))
                .toList();

        return new User(
                usuario.getEmail(),
                usuario.getPassword(),
                authorities);
    }
}
