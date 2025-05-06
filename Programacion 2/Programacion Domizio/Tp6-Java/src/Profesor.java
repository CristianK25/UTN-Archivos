import java.util.ArrayList;

public class Profesor  extends Persona{
    public ArrayList<Asignatura> curso = new ArrayList<>();

    public Profesor() {}

    public Profesor(String nombre, Integer legajo) {
        super(nombre, legajo);
    }

    public Profesor(String nombre, Integer legajo, Asignatura curso) {
        super(nombre, legajo);
        this.curso.add(curso);
    }

    public void agregarAsignatura(Asignatura asignatura){
        this.curso.add(asignatura);
    }
}
