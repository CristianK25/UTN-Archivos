package personas;

public class Pasaporte {
    private final String numero;
    public Pasaporte(String numero) { this.numero = numero; }
    public String getNumero() { return numero; }
    @Override public String toString() { return "Pasaporte{" + numero + "}"; }
}