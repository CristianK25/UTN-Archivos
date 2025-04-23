package Ejercicio2;

import java.util.ArrayList;

public class Pais {
    private String nombre;
    private ArrayList<Pais> limiteConOtro= new ArrayList<>();
    public ArrayList<Provincia> provincias = new ArrayList<>();



    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setProvincias(ArrayList<Provincia> provincias) {
        this.provincias = provincias;
    }

    public void agregarProvincia(Provincia p){
        provincias.add(p);
    }


    public void mostrarPais(){
        for (Provincia p : provincias) {
            p.mostrarProvincia();
        }
    }
}
