package entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@SuppressWarnings("ALL")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@SuperBuilder
public class Categoria {
    private Long id;
    private String denominacion;
}
