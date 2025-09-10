package hotel;

import personas.Cliente;

import java.time.LocalDate;
import java.util.Objects;

// Clase asociativa N–N con datos propios
public class Reserva {
    private final Cliente cliente;
    private final Habitacion habitacion;
    private final LocalDate checkIn;
    private final LocalDate checkOut;
    private final double precio;

    public Reserva(Cliente cliente, Habitacion habitacion,
                   LocalDate checkIn, LocalDate checkOut, double precio) {
        this.cliente = Objects.requireNonNull(cliente);
        this.habitacion = Objects.requireNonNull(habitacion);
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.precio = precio;

        // Mantener navegación en ambos extremos
        cliente.agregarReserva(this);
        habitacion.agregarReserva(this);
    }

    public Cliente getCliente() { return cliente; }
    public Habitacion getHabitacion() { return habitacion; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public double getPrecio() { return precio; }

    @Override public String toString() {
        return "Reserva{" + cliente.getNombre() + " en hab " + habitacion.getNumero()
                + " [" + checkIn + "→" + checkOut + "], $" + precio + "}";
    }
}
