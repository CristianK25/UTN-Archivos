package org.vesper.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@SuppressWarnings("All")
@Entity
@Table(name = "perfumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfume extends Producto {
    private String volumen;
    private String genero;
    private String notasPrincipales;
    private String familiaOlfativa;
    private String salida;
    private String corazon;
    private String fondo;
    private String inspiracion;

    private String fragancia;
    private Integer ml;
}
