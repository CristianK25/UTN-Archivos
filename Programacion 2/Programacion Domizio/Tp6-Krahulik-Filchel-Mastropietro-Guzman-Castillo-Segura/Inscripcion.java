import java.util.Date;
import java.util.HashMap;

public class Inscripcion {
    private Date fecha;
    public HashMap<Integer, String> inscripto = new HashMap<>();
    public Asignatura en;

    public Inscripcion(Asignatura asignatura){
        this.en = asignatura;
    }

    public Inscripcion(Date fecha, Estudiante estudiante, Asignatura asignatura, Integer numero) {
        this.fecha = fecha;
        this.inscripto.put(numero, estudiante.nombre);
        this.en = asignatura;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
}
