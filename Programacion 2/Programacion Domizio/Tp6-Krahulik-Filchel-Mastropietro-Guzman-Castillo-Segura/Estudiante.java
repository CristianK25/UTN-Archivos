import java.util.ArrayList;

public class Estudiante extends Persona{
    public ArrayList<Inscripcion> formulario = new ArrayList<>();

    public Estudiante(){}

    public Estudiante(String nombre, Integer legajo) {
        super(nombre, legajo);
    }

    public void agregarInscripcion(Inscripcion inscripcion){
        formulario.add(inscripcion);
    }
}
