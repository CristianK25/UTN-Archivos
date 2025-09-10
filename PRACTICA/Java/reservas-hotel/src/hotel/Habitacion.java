package hotel;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

// Parte compuesta del Hotel (mismo paquete para ctor package-private)
public class Habitacion {
    private final int numero;
    private final String tipo;
    private final Hotel hotel; // back-ref (1–N bidireccional)
    private final List<Reserva> reservas = new ArrayList<>();

    Habitacion(int numero, String tipo, Hotel hotel) {
        this.numero = numero;
        this.tipo = tipo;
        this.hotel = Objects.requireNonNull(hotel);
    }

    public void agregarReserva(Reserva r) { reservas.add(r); }

    public int getNumero() { return numero; }
    public String getTipo() { return tipo; }
    public Hotel getHotel() { return hotel; }
    public List<Reserva> getReservas() { return reservas; }

    @Override public String toString() {
        return "Habitacion{" + numero + ", " + tipo + " de " + hotel.getNombre() + "}";
    }
}
