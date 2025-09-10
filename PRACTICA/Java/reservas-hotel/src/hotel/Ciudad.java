package hotel;

import java.util.ArrayList;
import java.util.List;

public class Ciudad {
    private final String nombre;
    private final List<Hotel> hoteles = new ArrayList<>();

    public Ciudad(String nombre) { this.nombre = nombre; }

    public void agregarHotel(Hotel h) {
        if (h == null) return;
        hoteles.add(h);
        h.setCiudad(this); // navegación conveniente (agregación)
    }

    public String getNombre() { return nombre; }
    public List<Hotel> getHoteles() { return hoteles; }

    @Override public String toString() { return "hotel.Ciudad{" + nombre + "}"; }
}