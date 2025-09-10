package entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

@SuppressWarnings("ALL")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@SuperBuilder
public class ArticuloManufacturado extends Articulo {
    private String descripcion;
    private Integer tiempoEstimadoMinutos;
    private String preparacion;
}
