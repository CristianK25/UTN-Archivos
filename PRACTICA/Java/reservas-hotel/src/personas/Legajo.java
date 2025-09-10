package personas;

public class Legajo {
    private final String numero;
    private Empleado empleado; // 1–1 bidireccional

    public Legajo(String numero) { this.numero = numero; }

    public void setEmpleado(Empleado e) {
        this.empleado = e;
        if (e.getLegajo() != this) {
            e.setLegajo(this); // mantener consistencia inversa
        }
    }

    public Empleado getEmpleado() { return empleado; }
    public String getNumero() { return numero; }

    @Override public String toString() {
        return "Legajo{" + numero + ", empleado=" + (empleado != null ? empleado.getNombre() : "—") + "}";
    }
}
