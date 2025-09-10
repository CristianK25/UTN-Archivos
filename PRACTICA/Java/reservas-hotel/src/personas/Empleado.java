package personas;

public class Empleado {
    private final String nombre;
    private Legajo legajo; // 1–1 bidireccional

    public Empleado(String nombre) { this.nombre = nombre; }

    public void setLegajo(Legajo l) {
        this.legajo = l;
        if (l.getEmpleado() != this) {
            l.setEmpleado(this); // mantener consistencia inversa
        }
    }

    public String getNombre() { return nombre; }
    public Legajo getLegajo() { return legajo; }
}