package entidades;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "localidad")
@SuperBuilder
public class Domicilio {
    private Long id;
    private String calle;
    private Integer numero;
    private Integer cp;
    private Localidad localidad;
}