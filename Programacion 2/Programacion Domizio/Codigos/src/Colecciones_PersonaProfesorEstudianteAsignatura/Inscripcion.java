package Colecciones_PersonaProfesorEstudianteAsignatura;

import java.util.Date;

public class Inscripcion {
    private Date fecha;
    public Asignatura en;
    Estudiante inscripto;

    public Inscripcion() {
    }

    public Inscripcion(Date fecha, Asignatura en) {
        this.fecha = fecha;
        this.en = en;
        this.inscripto = new Estudiante();
    }


    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public void setEn(Asignatura en) {
        this.en = en;
    }

    public void setInscripto(Estudiante inscripto) {
        this.inscripto = inscripto;
    }

    @Override
    public String toString() {
        return "\nInscripcion" +
                "\nfecha = " + fecha +
                "\nen = " + en +
                "\ninscripto = " + inscripto;
    }
}
