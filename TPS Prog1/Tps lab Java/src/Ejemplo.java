import javax.swing.*;
import java.awt.*;

public class Ejemplo {
    public static void main(String[] args) {
        JOptionPane.showMessageDialog(null, "hola");


        JTextArea area = new JTextArea(10,40);
        area.setText("Hola me llamo cristian krahulik y tengo algo que contar porque se me acaba el tiempo"+
                "Hola me llamo cristian krahulik y tengo algo que contar porque se me acaba el tiempo"+
                "Hola me llamo cristian krahulik y tengo algo que contar porque se me acaba el tiempo");

        area.setEditable(false); // Hacer que el JTextArea no sea editable
        area.setLineWrap(true); // Habilitar el ajuste de línea
        area.setWrapStyleWord(true);// Ajustar por palabras en lugar de caracteres

        JScrollPane scroll = new JScrollPane(area);
        JPanel panel = new JPanel(new BorderLayout());
        panel.add(scroll, BorderLayout.CENTER);

        JOptionPane.showMessageDialog(null, panel, "Mensaje Largo", JOptionPane.INFORMATION_MESSAGE);
    }
}
