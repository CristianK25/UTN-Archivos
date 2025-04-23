import javax.swing.*;
import java.util.ArrayList;

public class Main {
    static ArrayList<Lote> lotes = new ArrayList<>();
    public static void main(String[] args) {
        JOptionPane.showMessageDialog(null, "Coperativa Agricultores\n");
        agregarLote();
        agregarCereal();
        mostrarLote();
    }

    public static void agregarLote(){
        int reiniciar = 0;
        TipoLote tipoLote;
        do{
            String nombre = JOptionPane.showInputDialog("Ingrese el nombre del lote");
            tipoLote = (TipoLote) (JOptionPane.showInputDialog(null,"¿Cual es el tipo de lote?","Lote",
                    JOptionPane.QUESTION_MESSAGE,null, TipoLote.values(), TipoLote.COMUN));
            lotes.add(new Lote(nombre, tipoLote));
            reiniciar = JOptionPane.showConfirmDialog(null,"¿Desea agregar otro lote?",
                    "",JOptionPane.YES_NO_OPTION);
        }while(reiniciar == 0);
    }

    public static void mostrarLote(){
        for (Lote lote : lotes){
            JOptionPane.showMessageDialog(null, "Nombre del lote: "+lote.getNombre()
                            + "\nTipo de Lote: " + lote.getTipoLote());
            lote.mostrarCereales();
        }
    }
    public static void agregarCereal(){
        int reiniciar = 0;
        TipoCereal tipoCereal;
        Lote opcionLote;
        do{
            opcionLote = (Lote) (JOptionPane.showInputDialog(null,"¿En que lote quieres plantar?",
                    "Lote", JOptionPane.QUESTION_MESSAGE,null,lotes.toArray(new Lote[0]),lotes.get(0)));
            tipoCereal = (TipoCereal) (JOptionPane.showInputDialog(null,"¿Que tipo de cereal vas a plantar?",
                    "Cereal", JOptionPane.QUESTION_MESSAGE,null, TipoCereal.values(), TipoCereal.COSECHA_FINA));
            opcionLote.plantarCereal(new Cereal(JOptionPane.showInputDialog("Ingrese el nombre del Cereal"),tipoCereal));
            reiniciar = JOptionPane.showConfirmDialog(null,"¿Desea plantar otro cereal?",
                    "",JOptionPane.YES_NO_OPTION);
        }while(reiniciar == 0);
    }
}