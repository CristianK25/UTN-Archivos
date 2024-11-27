package Asociaciones.CargaNotas;

public class Nota {
    private String catedra;
    private double notaExamen;

    public Nota(String catedra, double notaExamen) {
        this.catedra = catedra;
        this.notaExamen = notaExamen;
    }

    public double getNotaExamen() {
        return notaExamen;
    }

    @Override
    public String toString() {
        return "\n\t------"+
                "\n\tCatedra = '" + catedra + '\'' +
                "\n\tNota Examen = " + notaExamen;
    }
}
