package vehiculos;

import capacidades.Asegurable;
import capacidades.Conducible;

public class Moto extends Vehiculo implements Conducible, Asegurable {
    private final int cilindrada;

    public Moto(String patente, String modelo, int cilindrada) {
        super(patente, modelo);
        this.cilindrada = cilindrada;
    }

    public int getCilindrada() { return cilindrada; }

    @Override
    public void mover() {
        System.out.println("Moto " + patente + " se desplaza ágilmente.");
    }

    @Override
    public void conducir() {
        System.out.println("Conduciendo moto " + patente);
    }

    @Override
    public void asegurar() {
        System.out.println("Moto " + patente + " asegurada.");
    }

    @Override
    public String toString() {
        return "Moto{" + modelo + ", " + patente +
                ", cilindrada=" + cilindrada + "cc}";
    }
}
