package Colecciones_PersonaProfesorEstudianteAsignatura;

import java.util.ArrayList;

public class Asignatura {
    private Integer codigo;
    public Profesor instructor;

    public Asignatura() {
    }

    public Asignatura(Integer codigo,Profesor instructor) {
        this.codigo = codigo;
        this.instructor = instructor;
    }

    @Override
    public String toString() {
        return "\nAsignatura" +
                "\ncodigo = " + codigo +
                "\ninstructor = " + instructor;
    }
}
