package hotel;

import personas.Empleado;

import java.util.ArrayList;
import java.util.List;

public class Hotel {
    private final String nombre;
    private Ciudad ciudad; // agregación
    private final List<Habitacion> habitaciones = new ArrayList<>(); // composición + 1–N bi
    private final List<Empleado> empleados = new ArrayList<>();      // 1–N uni

    public Hotel(String nombre) { this.nombre = nombre; }

    // fábrica de composición: habitación nace dentro del hotel
    public Habitacion crearHabitacion(int numero, String tipo) {
        Habitacion h = new Habitacion(numero, tipo, this); // ctor package-private
        habitaciones.add(h);
        return h;
    }

    public void agregarEmpleado(Empleado e) { if (e != null) empleados.add(e); } // unidireccional

    // setters/getters
    public void setCiudad(Ciudad c) { this.ciudad = c; }
    public Ciudad getCiudad() { return ciudad; }
    public String getNombre() { return nombre; }
    public List<Habitacion> getHabitaciones() { return habitaciones; }
    public List<Empleado> getEmpleados() { return empleados; }

    @Override public String toString() {
        return "hotel.Hotel{" + nombre + " en " + (ciudad != null ? ciudad.getNombre() : "—") + "}";
    }
}
