package entidades;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class Provincia {
    private Long id;
    private String nombre;

    @Builder.Default
    private Set<Localidad> localidades = new HashSet<>();
    private Pais pais;

}
