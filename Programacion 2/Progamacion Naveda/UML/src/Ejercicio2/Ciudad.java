package Ejercicio2;

public class Ciudad {
    private String nombre;
    private boolean esCapital;


    public Ciudad(String nombre, boolean esCapital) {
        this.nombre = nombre;
        this.esCapital = esCapital;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public boolean isEsCapital() {
        return esCapital;
    }

    public void setEsCapital(boolean esCapital) {
        this.esCapital = esCapital;
    }

    public void mostrarCiudad() {
        System.out.println("Nombre: " + nombre);
        System.out.println("Capital: " + esCapital);
    }
}
