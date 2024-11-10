package Asociaciones.Restaurante;

import java.util.ArrayList;

public class Plato {
    private String nombreCompleto;
    private double precio;
    private boolean esBebida;
    ArrayList<Ingrediente> ingredientes;

    public Plato(String nombreCompleto, double precio, boolean esBebida) {
        this.nombreCompleto = nombreCompleto;
        this.precio = precio;
        this.esBebida = esBebida;
        ingredientes = new ArrayList<>();
    }

    public boolean isEsBebida() {
        return esBebida;
    }

    public void agregarIngrediente(Ingrediente ingrediente) {
        ingredientes.add(ingrediente);
    }

    public void mostrarPlato() {
        String plato;
        if (esBebida) {
             plato ="\n'" + nombreCompleto + '\'' +
                    "\nPrecio = $" + precio;
            System.out.println(plato);
        }
        else{
            plato = "Plato " +
                    "\nNombreCompleto = '" + nombreCompleto + '\'' +
                    "\nPrecio = $" + precio +
                    "\nIngredientes : " +
                    "\nNombre\tCantidad\tUnidad de medida";
            System.out.println(plato);
            for (Ingrediente ingrediente : ingredientes) {
                System.out.printf("%s\t\t%d\t\t%s\n",ingrediente.getNombre(),ingrediente.getCantidad(),ingrediente.getUnidadMedida());
            }
        }

    }
}
