package entidades;

import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class Pais {
    private Long id;
    private String nombre;
    private Set<Provincia> provincias;
}
