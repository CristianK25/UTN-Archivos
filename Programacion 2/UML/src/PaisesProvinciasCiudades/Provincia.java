package PaisesProvinciasCiudades;

import java.util.ArrayList;

public class Provincia {
    private String nombre;
    public ArrayList<Ciudad> ciudades = new ArrayList<>();


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
