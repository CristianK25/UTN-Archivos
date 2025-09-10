package personas;

import hotel.Reserva;

import java.util.ArrayList;
import java.util.List;

public class Cliente {
    private final String nombre;
    private Pasaporte pasaporte; // 1–1 unidireccional
    private final List<Reserva> reservas = new ArrayList<>(); // navegación desde cliente

    public Cliente(String nombre) { this.nombre = nombre; }

    public void setPasaporte(Pasaporte p) { this.pasaporte = p; }
    public void agregarReserva(Reserva r) { reservas.add(r); }

    public String getNombre() { return nombre; }
    public Pasaporte getPasaporte() { return pasaporte; }
    public List<Reserva> getReservas() { return reservas; }

    @Override public String toString() {
        return "Cliente{" + nombre + ", pasaporte=" + (pasaporte != null ? pasaporte : "—") + "}";
    }
}
