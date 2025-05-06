package Colecciones_PersonaProfesorEstudianteAsignatura;

import java.util.ArrayList;
import java.util.HashMap;

public class Estudiante extends Persona {
    public HashMap<Integer,Inscripcion> formulario;

    public Estudiante() {
        super();
        formulario = new HashMap<>();
    }

    public Estudiante(String nombre, Integer legajo, Inscripcion inscripcion, Integer integer) {
        super(nombre, legajo);
        formulario = new HashMap<>();
        formulario.put(integer,inscripcion);
    }

    public void agregarFormulario (Integer integer, Inscripcion inscripcion) {
        formulario.put(integer,inscripcion);
    }

    @Override
    public String toString() {
        return "\nEstudiante" +
                "\nformulario = " + formulario;
    }
}
