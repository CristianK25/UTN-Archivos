package Colecciones_PersonaProfesorEstudianteAsignatura;

public class Persona {
    protected String nombre;
    public Integer legajo;

    public Persona() {
    }

    public Persona(String nombre, Integer legajo) {
        this.nombre = nombre;
        this.legajo = legajo;
    }

    @Override
    public String toString() {
        return "\nPersona" +
                "\nnombre = '" + nombre + '\'' +
                "\nlegajo = " + legajo;
    }
}
