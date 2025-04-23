package Asociaciones.Restaurante;

public class Ingrediente {
    private String nombre;
    private int cantidad;
    private String unidadMedida;

    public Ingrediente(String nombre, int cantidad, String unidadMedida) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
    }

    public String getNombre() {
        return nombre;
    }

    public int getCantidad() {
        return cantidad;
    }

    public String getUnidadMedida() {
        return unidadMedida;
    }

}
