package Ejercicio5;

import java.util.ArrayList;

public class Persona {
    private String nombre;
    private ArrayList<Restaurante> restaurantesFrecuentados;
    private ArrayList<Gusto> gustos;

    public Persona(String nombre) {
        this.nombre = nombre;
        restaurantesFrecuentados = new ArrayList<>();
        gustos = new ArrayList<>();
    }

    public void agregarRestaurante(Restaurante restaurante) {
        restaurantesFrecuentados.add(restaurante);
    }
    public void agregarGusto(Gusto gusto) {
        gustos.add(gusto);
    }
}
