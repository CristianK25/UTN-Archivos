package org.springej.backende_commerce.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "Usuario")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario")
    private Long id;

    @Column(name = "nombre_usuario")
    private String nombre;

    @Column(name = "apellido_usuario")
    private String apellido;

    @Column(name = "contrasena_usuario")
    private String password;

    @Column(name = "email_usuario")
    private String email;

    @Column(name = "codigo_area_usuario")
    private int CodigoArea;

    @Column(name = "numero_telefono_usuario")
    private String numeroTelefono;

    //Navegacion Inversa con Ventas
    @OneToMany(mappedBy = "usuario")
    private List<Venta> ventas;

    //Navegacion Inversa con Favoritos
    @OneToMany(mappedBy = "usuario")
    private List<Favorito> productosFavoritos;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_rol",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "rol_id"))
    @Builder.Default
    private Set<Rol> roles = new HashSet<>();
}
