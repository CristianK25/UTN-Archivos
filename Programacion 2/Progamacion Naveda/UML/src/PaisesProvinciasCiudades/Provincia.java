package PaisesProvinciasCiudades;

import java.util.ArrayList;

public class Provincia {
    private String nombre;
    private Ciudad capital;
    public ArrayList<Ciudad> ciudades = new ArrayList<>();
    public ArrayList<Provincia> provinciasLimite = new ArrayList<>();
    public ArrayList<Pais> paisesLimite = new ArrayList<>();


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
