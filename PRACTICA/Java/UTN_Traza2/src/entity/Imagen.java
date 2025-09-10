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
public class Imagen {
    private String denominacion;
    private Long id;
}
