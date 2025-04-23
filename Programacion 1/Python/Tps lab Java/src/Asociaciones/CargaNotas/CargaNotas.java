package Asociaciones.CargaNotas;

import javax.swing.*;
import java.util.ArrayList;

public class CargaNotas {
    private static ArrayList<Alumno> alumnos = new ArrayList<>();

    public static void main(String[] args) {
        cargarAlumnos();
        mostrarAlumnos();
    }
    public static void cargarAlumnos(){
        int ingreso;
        do{
            String nombre = JOptionPane.showInputDialog("Ingrese el nombre del alumno: ");
            long legajo = Long.parseLong(JOptionPane.showInputDialog("Ingrese el legajo de "+nombre+": "));
            Alumno alumno = new Alumno(nombre, legajo);
            cargarNotas(alumno);
            alumnos.add(alumno);
            ingreso = JOptionPane.showConfirmDialog(null,"¿Agregar otro alumno?",
                    "AGREGAR ALUMNO",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
        }while(ingreso == 0);
    }

    public static void cargarNotas(Alumno alu){
        int ingreso;
        do{
            String catedra = JOptionPane.showInputDialog("Ingrese la catedra: ");
            long notaExamen = Long.parseLong(JOptionPane.showInputDialog("Ingrese la nota de "+catedra+": "));
            Nota nota = new Nota(catedra,notaExamen);
            alu.agregarNota(nota);
            ingreso = JOptionPane.showConfirmDialog(null,"¿Agregar otra Nota?",
                    "AGREGAR NOTA",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
        }while(ingreso == 0);
    }

    public static void mostrarAlumnos(){
        for(Alumno alumno: alumnos){
            System.out.println(alumno);
        }
    }
}
