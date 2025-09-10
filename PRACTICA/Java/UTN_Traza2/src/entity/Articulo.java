package entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Articulo {
    protected String denominacion;
    protected Double precioVenta;
    protected Long id;


    protected Set<Imagen> imagenes = new HashSet<>();
}
