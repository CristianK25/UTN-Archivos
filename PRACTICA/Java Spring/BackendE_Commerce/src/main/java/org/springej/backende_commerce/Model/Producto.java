package org.springej.backende_commerce.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Producto")
@Data
@NoArgsConstructor
public class Producto {
    @Id
    @GeneratedValue
    @Column(name = "idProducto")
    private Long id;

    @Column(name = "nombre_producto")
    private String nombre;

    @Column(name = "descripcion_producto")
    private String descripcion;

    @Column(name = "precio_unitario_producto")
    private double precio;
}
