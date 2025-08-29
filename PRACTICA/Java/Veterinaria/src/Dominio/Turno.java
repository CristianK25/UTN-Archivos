package Dominio;

import java.time.LocalDate;

public class Turno implements Imprimible{
    private LocalDate fecha;
    private Animal animal;

    public Turno(LocalDate fecha, Animal animal) {
        this.fecha = fecha;
        this.animal = animal;
    }

    public Turno() {
    }


    public void ejecutarChequeo(){}

    public Animal getAnimal() {
        return animal;
    }


    @Override
    public String getContenidoImpresion() {
        return "";
    }
}
