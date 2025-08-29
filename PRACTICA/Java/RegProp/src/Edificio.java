import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Edificio {
    private int idEdificio;
    private String nombre;
    private double superficieConstruida;
}
