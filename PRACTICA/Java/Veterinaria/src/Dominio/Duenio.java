package Dominio;

import java.util.List;

public class Duenio {
    private String nombre;
    private List<Animal> mascotas;
    private Telefono telefono;

    public Duenio(String nombre, List<Animal> mascotas) {
        this.nombre = nombre;
        this.mascotas = mascotas;
        this.telefono = new Telefono();
    }
}
