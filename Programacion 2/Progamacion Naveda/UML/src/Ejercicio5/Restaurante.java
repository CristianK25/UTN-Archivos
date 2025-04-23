package Ejercicio5;

public class Restaurante {
    private String nombre;
    private int cantSucursales;
    private Plato[] platos;

    public Restaurante(String nombre, int cantSucursales) {
        this.nombre = nombre;
        this.cantSucursales = cantSucursales;
        platos = new Plato[20];
    }

    public void agregarPlato(Plato plato) {
        for (int i = 0; i < platos.length; i++) {
            if (platos[i] == null) {
                platos[i] = plato;
                return;
            }
        }
    }
}
