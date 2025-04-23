package Ejercicio2;

import java.util.ArrayList;

public class Provincia {
    private String nombre;
    private Ciudad capital;
    public ArrayList<Ciudad> ciudades = new ArrayList<>();
    public ArrayList<Provincia> provinciasLimite = new ArrayList<>();
    public ArrayList<Pais> paisesLimite = new ArrayList<>();


    public Provincia(String nombre) {
        this.nombre = nombre;
    }

    public void setCiudades(ArrayList<Ciudad> ciudades) {
        this.ciudades = ciudades;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public void mostrarProvincia(){
        System.out.println("Nombre Provincia: " + this.nombre);
        System.out.println("Capital Provincia: " + this.capital);
        for(Ciudad ciudad : ciudades) {
            ciudad.mostrarCiudad();
        }
    }
}
