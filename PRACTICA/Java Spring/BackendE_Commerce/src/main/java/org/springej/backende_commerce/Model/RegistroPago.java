package org.springej.backende_commerce.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Registro_Pago")
@Data
@NoArgsConstructor
public class RegistroPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRegistro_Pago")
    private Long id;

    @Column(name = "cantidad_total")
    private float cantidadTotal;

    @Column(name = "CVU_registro_pago")
    private int cvu;

    @Column(name = "alias_registro_pago")
    private String alias;

    // Relación con Venta
    @OneToOne
    @JoinColumn(name = "idVenta", nullable = false)
    private Venta venta;

//    @JoinColumn
//    @Column(name = "Venta_Usuario_idUsuario")
//    private Usuario usuario;
}
