package org.springej.usuario_tarea.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tarea {

    @Id
    @GeneratedValue()
    private long id;
    private String nombre;
    private String descripcion;
    private String estado;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
