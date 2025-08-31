import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
 @ToString(exclude = "registro")
 @EqualsAndHashCode(exclude = "registro")
public class Escritura {

    private int numeroEscritura;
    private Lote lote;

    private RegistroPropiedad registro; // Referencia al Registro

    private String fechaEscritura;

}
