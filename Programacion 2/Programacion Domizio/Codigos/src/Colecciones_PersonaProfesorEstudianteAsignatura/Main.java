package Colecciones_PersonaProfesorEstudianteAsignatura;

import Colecciones_PersonaProfesorEstudianteAsignatura.Asignatura;

import java.util.ArrayList;

public class Main {
    static ArrayList<Asignatura> asignaturas = new ArrayList<>();
    public static void main(String[] args) {
        Asignatura lengua = new Asignatura();
        Asignatura matematica = new Asignatura();
        Inscripcion inscripcion1 = new Inscripcion();
        Inscripcion inscripcion2 = new Inscripcion();
        inscripcion1.setEn(lengua);
        inscripcion2.setEn(matematica);
        Estudiante estudiante1 = new Estudiante("Cris",444,inscripcion1,1);
        Estudiante estudiante2 = new Estudiante("Juan",555,inscripcion2,1);
        asignaturas.add(lengua);
        asignaturas.add(matematica);
        Profesor profesor = new Profesor(asignaturas);

        //D) Desde un objeto Profesor:
        //1) Todas las asignaturas que imparte.
        profesor.mostarAsignaturas();
    }
    public void mostrarAlumnosDeProfesor(){
        System.out.println("Eliga una de las materias");
        
    }
}


