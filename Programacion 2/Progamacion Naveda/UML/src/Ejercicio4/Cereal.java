public class Cereal {
    private String nombre;
    private TipoCereal tipoCereal;

    public Cereal(String nombre, TipoCereal tipoCereal) {
        this.nombre = nombre;
        this.tipoCereal = tipoCereal;
    }

    public TipoCereal getTipoCereal() {
        return tipoCereal;
    }

    @Override
    public String toString() {
        return "Nombre = '" + nombre + '\'' +
                "\nTipo de Cereal = " + tipoCereal;
    }
}
