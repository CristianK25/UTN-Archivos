package vehiculos;

import capacidades.Asegurable;
import capacidades.Navegable;

public class Barco extends Vehiculo implements Navegable, Asegurable {
    private final boolean esDeportiva;
    private final double eslora;

    public Barco(String patente, String modelo, boolean esDeportiva, double eslora) {
        super(patente, modelo);
        this.esDeportiva = esDeportiva;
        this.eslora = eslora;
    }

    public boolean isEsDeportiva() { return esDeportiva; }
    public double getEslora() { return eslora; }

    @Override
    public void mover() {
        System.out.println("Barco " + patente + " navega en el mar.");
    }

    @Override
    public void navegar() {
        System.out.println("Navegando barco " + patente);
    }

    @Override
    public void asegurar() {
        System.out.println("Barco " + patente + " asegurado.");
    }

    @Override
    public String toString() {
        return "Barco{" + modelo + ", " + patente +
                ", eslora=" + eslora + "m, deportiva=" + esDeportiva + "}";
    }
}