package org.springej.backende_commerce.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Promocion")
@Data
@NoArgsConstructor
public class Promocion {
    @Id
    @GeneratedValue
    @Column(name = "idPromocion")
    private Long id;

    @Column(name = "porcentaje_promocion")
    private double porcentajeDescuento;
}
