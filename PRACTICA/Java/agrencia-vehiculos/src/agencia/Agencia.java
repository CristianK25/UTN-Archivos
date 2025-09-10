package agencia;

import vehiculos.Vehiculo;

import java.util.ArrayList;
import java.util.List;

public class Agencia {

    private final String nombre;
    private final List<Vehiculo> flota = new ArrayList<>();

    public Agencia(String nombre) { this.nombre = nombre; }

    public void agregarVehiculo(Vehiculo v) { if (v != null) flota.add(v); }
    public List<Vehiculo> getFlota() { return flota; }

    @Override
    public String toString() {
        return "Agencia{" + nombre + ", vehiculos=" + flota.size() + "}";
    }

}
