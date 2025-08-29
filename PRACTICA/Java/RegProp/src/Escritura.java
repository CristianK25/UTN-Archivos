import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Escritura {

    private int numeroEscritura;
    private Lote lote;
    private RegistroPropiedad registroPropiedad;
    private String fechaEscritura;


}
