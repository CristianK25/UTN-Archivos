package org.springej.backende_commerce.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Estrellas")
@Data
@NoArgsConstructor
public class Estrellas {
    @Id
    @GeneratedValue
    @Column(name = "idEstrellas")
    private Long id;

    @Column(name = "cantidad_estrellas")
    private int cantidad;

    // Relación con Producto
    @ManyToOne
    @JoinColumn(name = "idProducto", nullable = false)
    private Producto producto;
}
