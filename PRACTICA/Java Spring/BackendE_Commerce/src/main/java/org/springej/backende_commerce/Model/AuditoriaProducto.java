package org.springej.backende_commerce.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Auditoria_producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditoriaProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAuditoria_producto")
    private Long id;

    @Column(name = "nombre_producto_historico")
    private String nombre;

    @Column(name = "descripcion_producto_historico")
    private String descripcionHistorico;

    @Column(name = "precio_producto_historico")
    private float precioHistorico;

    @Column(name = "fecha_auditoria")
    private LocalDate fechaAuditoria;

    @ManyToOne
    @JoinColumn(name = "idProducto")
    private Producto producto;
}
