package Asociaciones.Restaurante;

import javax.swing.*;
import java.util.ArrayList;

public class MenuRestaurant {
    private static ArrayList<Plato> platos = new ArrayList<>();

    public static void main(String[] args) {
        System.out.println("---------MENU----------");
        cargarPlatos();
        mostrarPlatos();
    }

    public static void cargarPlatos() {
        int reiniciar;
        do{
            try{
                String nombre = JOptionPane.showInputDialog(null,"\"Ingrese el nombre del plato\"","PLATOS",JOptionPane.INFORMATION_MESSAGE);
                double precio = Double.parseDouble(JOptionPane.showInputDialog(null ,"Ingrese el precio de "+nombre,"PLATOS",JOptionPane.INFORMATION_MESSAGE));
                boolean esBebida = mostrarConfirmacion();
                Plato plato = new Plato(nombre, precio, esBebida);
                cargarIngredientes(plato);
                platos.add(plato);
            }catch(Exception e){
                JOptionPane.showMessageDialog(null, "Error al ingresar el precio");
            }
            reiniciar = JOptionPane.showConfirmDialog(null,"¿Ingresar otro plato?","Plato",JOptionPane.YES_NO_OPTION);
        }while(reiniciar == 0);
    }

    public static boolean mostrarConfirmacion(){
        int esBebida = JOptionPane.showConfirmDialog(
                null,
                "¿Es una bebida?",
                "PLATO",
                JOptionPane.YES_NO_OPTION,
                JOptionPane.QUESTION_MESSAGE);
        return esBebida == JOptionPane.YES_OPTION;
    }

    public static void cargarIngredientes(Plato plato) {
        if (!plato.isEsBebida()){
            int reiniciar;
            do {
                String nombre = JOptionPane.showInputDialog(null,"Ingrese el nombre del ingrediente","INGREDIENTES",JOptionPane.INFORMATION_MESSAGE);
                int cantidad = Integer.parseInt(JOptionPane.showInputDialog(null,"Ingrese el cantidad de "+ nombre,"INGREDIENTES",JOptionPane.INFORMATION_MESSAGE));
                String unidadMedida = JOptionPane.showInputDialog("Ingrese el unidad medida de "+ nombre);
                plato.agregarIngrediente(new Ingrediente(nombre, cantidad, unidadMedida));
                reiniciar = JOptionPane.showConfirmDialog(null,"¿Ingresar otro ingrediente?","INGREDIENTES",JOptionPane.YES_NO_OPTION);
            }while(reiniciar == 0);
        }
    }

    public static void mostrarPlatos(){
        for (Plato plato : platos){
            plato.mostrarPlato();
            System.out.println("-----------------");
        }
    }
}
