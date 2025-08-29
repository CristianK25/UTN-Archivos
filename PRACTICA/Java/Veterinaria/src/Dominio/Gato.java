package Dominio;

public class Gato extends Animal {
    private String color;

    public Gato(String color) {
        this.color = color;
    }

    public Gato() {
    }

    @Override
    public String emitirSonido() {
        return "Miau";
    }

    @Override
    public String getDieta() {
        return "Comida Gato";
    }

    @Override
    public boolean neesitaVacunaAnual() {
        return false;
    }
}
