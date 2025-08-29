import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Lote {
    private int idPadron;
    private String domicilio;
    private double superficie;
    private Edificio edificioConstruido;

    public boolean isConstruible(){
        return edificioConstruido != null;
    }
}
