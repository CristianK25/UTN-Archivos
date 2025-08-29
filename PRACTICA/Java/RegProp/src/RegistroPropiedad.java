import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class RegistroPropiedad {

    private int idRegistro;
    private String nombreRegistro;

    @Builder.Default
    private List<Escritura> escrituras = new ArrayList<>();
    private static int nextNumeroEscritura = 0;

    public void registrarLote(Lote lote, String fechaEscritura){
        nextNumeroEscritura++;
        System.out.println(nextNumeroEscritura);
        Escritura escritura = new Escritura(nextNumeroEscritura,lote,this,fechaEscritura);
        escrituras.add(escritura);
        System.out.println("Lote registrado");
    }

    public void construirEdificio(Lote lote,Edificio edificio){
        if (lote.isConstruible()){
            lote.setEdificioConstruido(edificio);
            System.out.println("Edificio construido");
        }else {
            System.out.println("No se puede construir lote");
        }
    }

}
