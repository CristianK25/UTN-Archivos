package Asociaciones.CargaNotas;

import java.util.ArrayList;

public class Alumno {
    private String nombre;
    private long legajo;
    private ArrayList<Nota> notas;

    public Alumno(String nombre, long legajo) {
        this.nombre = nombre;
        this.legajo = legajo;
        this.notas = new ArrayList<>();
    }

    public void agregarNota(Nota nota) {
        notas.add(nota);
    }

    public double calcularPromedio(){
        double promedio = 0;
        for (Nota nota : notas) {
            promedio += nota.getNotaExamen();
        }
        return promedio / notas.size();
    }

    @Override
    public String toString() {
        return "Alumno: " +
                "\nNombre = '" + nombre + '\'' +
                "\nLegajo = " + legajo +
                "\nNotas = " + notas +
                "\n------" +
                "\nPromedio = "+ calcularPromedio();
    }
}
