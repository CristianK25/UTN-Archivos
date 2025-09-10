package vehiculos;

import capacidades.Asegurable;
import capacidades.Conducible;

public class Auto extends Vehiculo implements Conducible, Asegurable {
    private final int cantidadPuertas;
    private final String tipoCombustible;

    public Auto(String patente, String modelo, int cantidadPuertas, String tipoCombustible) {
        super(patente, modelo);
        this.cantidadPuertas = cantidadPuertas;
        this.tipoCombustible = tipoCombustible;
    }

    public int getCantidadPuertas() { return cantidadPuertas; }
    public String getTipoCombustible() { return tipoCombustible; }

    @Override
    public void mover() {
        System.out.println("Auto " + patente + " circula por la carretera.");
    }

    @Override
    public void conducir() {
        System.out.println("Conduciendo auto " + patente);
    }

    @Override
    public void asegurar() {
        System.out.println("Auto " + patente + " asegurado.");
    }

    @Override
    public String toString() {
        return "Auto{" + modelo + ", " + patente +
                ", puertas=" + cantidadPuertas +
                ", combustible=" + tipoCombustible + "}";
    }
}
