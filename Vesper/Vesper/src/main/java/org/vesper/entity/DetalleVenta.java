package org.vesper.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "detalle_ventas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con la venta
    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    private Venta venta;

    // Relación con el producto comprado
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    private Integer cantidad;

    // Precio histórico del producto en ese momento
    private Double precioUnitario;

    // subtotal = cantidad * precioUnitario
    private Double subtotal;
}
