import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "residente")
@EqualsAndHashCode(exclude = "residente")

public class Domicilio {
    private String calle;
    private int numero;
    private Persona residente;
}
