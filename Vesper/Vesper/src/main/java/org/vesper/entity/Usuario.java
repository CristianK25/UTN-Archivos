package org.vesper.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    // ADMIN o USER
    @Enumerated(EnumType.STRING)
    private Rol rol;

    private boolean activo = true;

    private LocalDateTime fechaCreacion = LocalDateTime.now();

    public enum Rol {
        ADMIN, USER
    }
}
