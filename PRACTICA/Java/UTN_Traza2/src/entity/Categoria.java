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
public class Categoria {
    private int id;
    private String denominacion;
}
