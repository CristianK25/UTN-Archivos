package org.vesper.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "promociones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private String descripcion;

    private Double descuento; // Ej: 0.20 para 20%

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private boolean activo = true;
}
