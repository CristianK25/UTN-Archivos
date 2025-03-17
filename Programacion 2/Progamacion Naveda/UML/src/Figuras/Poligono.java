package Figuras;

import java.util.ArrayList;

public abstract class Poligono {
    private ArrayList<Lado> lados;

    public Poligono(ArrayList<Lado> lados) {
        this.lados = lados;
    }
}
