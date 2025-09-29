package org.vesper.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    private String marca;

    private String tipo;

    private String tamaño;

    private Double precio;

    private Integer stock;

    private String imagenUrl;

    private String fragancia;

    private boolean activo = true;
}
