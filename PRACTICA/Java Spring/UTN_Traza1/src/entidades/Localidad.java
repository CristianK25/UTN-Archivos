package entidades;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class Localidad {
    private Long id;
    private String nombre;
    private Provincia provincia;


}
