import javax.swing.*;


public class Main {
    private static Rectangulo[] rectangulos = new Rectangulo[5];
    public static void main(String[] args) {
        for (int i = 0; i < 2; i++) {
            JOptionPane.showMessageDialog(null, "Ingrese cuadrado "+(i+1));
            crearRectangulo(i);
        }
        mostrarRectangulos();
    }

    public static void mostrarRectangulos() {
        for (int i = 0; i < 2; i++) {
            rectangulos[i].mostrarTodos();
        }
    }
    public static void crearRectangulo(int i){
        float base = Float.parseFloat(JOptionPane.showInputDialog("Ingrese la base :"));
        float altura = Float.parseFloat(JOptionPane.showInputDialog("Ingrese la altura :"));
        String color = JOptionPane.showInputDialog("Ingrese el color :");
        Rectangulo rect = new Rectangulo(base, altura, color);
        rectangulos[i] = rect;
    }
}