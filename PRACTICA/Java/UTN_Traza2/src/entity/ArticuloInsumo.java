package entity;


import lombok.*;
import lombok.experimental.SuperBuilder;

@SuppressWarnings("ALl")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@SuperBuilder
public class ArticuloInsumo extends Articulo {
    private Double precioCompra;
    private Integer stockActual;
    private Integer stockTotal;
    private boolean esParaElaborar;
}
