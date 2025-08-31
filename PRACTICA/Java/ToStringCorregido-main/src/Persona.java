import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Clase Persona (versión corregida)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Persona {
    private String nombre;
    private int edad;
    private Domicilio domicilio;
}