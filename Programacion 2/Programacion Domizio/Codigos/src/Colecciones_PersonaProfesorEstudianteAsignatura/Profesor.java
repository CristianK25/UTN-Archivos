package Colecciones_PersonaProfesorEstudianteAsignatura;

import java.util.ArrayList;

public class Profesor extends Persona {
    public ArrayList<Asignatura> curso;

    public Profesor(ArrayList<Asignatura> curso) {
        this.curso = curso;
    }

    public Profesor(String nombre, Integer legajo, ArrayList<Asignatura> curso) {
        super(nombre, legajo);
        this.curso = curso;
    }

    public void mostarAsignaturas(){
        int cont = 1;
        for(Asignatura asignatura : curso){
            System.out.println(cont + asignatura.toString());
            cont++;
        }
    }

    public void agregarAsignatura(Asignatura asignatura){
        curso.add(asignatura);
    }

}
