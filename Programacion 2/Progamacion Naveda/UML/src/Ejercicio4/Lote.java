import javax.swing.*;
import java.util.ArrayList;

public class Lote {
    private String nombre;
    private TipoLote tipoLote;
    private ArrayList<Cereal> cereales;

    public Lote(String nombre, TipoLote tipoLote) {
        this.nombre = nombre;
        this.tipoLote = tipoLote;
        cereales = new ArrayList<>();
    }

    public void plantarCereal(Cereal cereal) {
        if (hayPastura() && cereal.getTipoCereal().equals(TipoCereal.PASTURA)) {
            JOptionPane.showMessageDialog(null,"Este lote ya tiene una pastura plantada");
        } else if(tipoLote.equals(TipoLote.COMUN)) {
            if (cereal.getTipoCereal().equals(TipoCereal.COSECHA_GRUESA)) {
                JOptionPane.showMessageDialog(null, "¡Cereal plantado con exito!");
                cereales.add(cereal);
            }else JOptionPane.showMessageDialog(null,"Este lote no es apto para el cereal seleccionado");
        }else{
            JOptionPane.showMessageDialog(null, "¡Cereal plantado con exito!");
            cereales.add(cereal);
        }
    }

    public boolean hayPastura(){
        for (Cereal cereal : cereales) {
            if(cereal.getTipoCereal().equals(TipoCereal.PASTURA)) {
                return true;
            }
        }
        return false;
    }

    public String getNombre() {
        return nombre;
    }

    public TipoLote getTipoLote() {
        return tipoLote;
    }

    public void mostrarCereales(){
        for (Cereal cereal : cereales) {
            JOptionPane.showMessageDialog(null,cereal.toString());
        }
    }

    @Override
    public String toString() {
        return this.nombre;
    }
}
