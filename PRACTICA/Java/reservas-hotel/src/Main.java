import hotel.Ciudad;
import hotel.Habitacion;
import hotel.Hotel;
import hotel.Reserva;
import personas.Cliente;
import personas.Empleado;
import personas.Legajo;
import personas.Pasaporte;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {

        // [Agregación] Ciudad "tiene" hoteles (vida independiente)
        Ciudad mendoza = new Ciudad("Mendoza");
        Hotel solAndino = new Hotel("Sol Andino");
        Hotel cordillera = new Hotel("Cordillera Suites");
        mendoza.agregarHotel(solAndino);
        mendoza.agregarHotel(cordillera);
        System.out.println("[Agregación] " + mendoza + " tiene " + mendoza.getHoteles().size() + " hoteles.");

        // [Composición + 1–N bidireccional] Habitaciones creadas por el Hotel
        Habitacion h101 = solAndino.crearHabitacion(101, "Doble");
        Habitacion h102 = solAndino.crearHabitacion(102, "Suite");
        System.out.println("[Composición] " + solAndino + " posee " + solAndino.getHabitaciones().size() + " habitaciones.");
        System.out.println("  Habitación " + h101.getNumero() + " conoce su hotel: " + h101.getHotel());

        // [1–1 unidireccional] Cliente → Pasaporte
        Cliente ana = new Cliente("Ana");
        ana.setPasaporte(new Pasaporte("AR-123456"));
        System.out.println("[1–1 unidireccional] " + ana);

        // [1–1 bidireccional] Empleado ↔ Legajo (sin herencia)
        Empleado juan = new Empleado("Juan");
        Legajo legajoJuan = new Legajo("LEG-001");
        juan.setLegajo(legajoJuan); // set en un extremo enlaza el otro
        System.out.println("[1–1 bidireccional] " + juan.getLegajo());

        // [1–N unidireccional] Hotel → Empleado
        solAndino.agregarEmpleado(juan);
        System.out.println("[1–N unidireccional] " + solAndino + " tiene " + solAndino.getEmpleados().size() + " empleado(s).");

        // [Asociativa N–N con datos] Reserva une Cliente y Habitación
        Reserva r1 = new Reserva(ana, h101,
                LocalDate.of(2025, 9, 10), LocalDate.of(2025, 9, 15), 250_000);
        Reserva r2 = new Reserva(ana, h102,
                LocalDate.of(2025, 12, 1), LocalDate.of(2025, 12, 3), 180_000);

        System.out.println("[Asociativa] " + r1);
        System.out.println("[Asociativa] " + r2);

        // Navegación materializada:
        System.out.println("  Ana tiene " + ana.getReservas().size() + " reservas.");
        System.out.println("  Hab 101 participa en " + h101.getReservas().size() + " reserva(s).");

        // Demostración de agregación: "mover" un hotel a otra ciudad
        Ciudad sanJuan = new Ciudad("San Juan");
        sanJuan.agregarHotel(cordillera);
        System.out.println("[Agregación] " + sanJuan + " ahora tiene " + sanJuan.getHoteles().size() + " hotel(es).");

    }
}