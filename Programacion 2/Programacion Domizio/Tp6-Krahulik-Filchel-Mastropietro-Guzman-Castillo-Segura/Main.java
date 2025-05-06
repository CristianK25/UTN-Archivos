import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        Profesor profesor1 = new Profesor("Alex", 50022);

        ArrayList<Asignatura> asignaturas = new ArrayList<>();
        Asignatura asignatura1 = new Asignatura(0,profesor1);
        Asignatura asignatura2 = new Asignatura(1,profesor1);
        Asignatura asignatura3 = new Asignatura(2,profesor1);
        asignaturas.add(asignatura1);asignaturas.add(asignatura2);asignaturas.add(asignatura3);

        profesor1.agregarAsignatura(asignatura1);profesor1.agregarAsignatura(asignatura2);

        ArrayList<Estudiante> estudiantes = new ArrayList<>();
        Estudiante estudiante1 = new Estudiante("Marcos",10021);
        Estudiante estudiante2 = new Estudiante("Juliana",53322);
        Estudiante estudiante3 = new Estudiante("Franco",23424);
        estudiantes.add(estudiante1);estudiantes.add(estudiante2);estudiantes.add(estudiante3);

        Inscripcion inscripcion1 = new Inscripcion(new Date(),estudiante1,asignatura1,1);
        Inscripcion inscripcion2 = new Inscripcion(new Date(),estudiante2,asignatura1,2);
        Inscripcion inscripcion3 = new Inscripcion(new Date(),estudiante3,asignatura2,3);

        estudiante1.agregarInscripcion(inscripcion1);estudiante2.agregarInscripcion(inscripcion2);estudiante3.agregarInscripcion(inscripcion3);

        System.out.println("--------------Ejercicio D)-1)-----------------");
        System.out.println("Profesor: " + profesor1.nombre); //Ejercicio D)-1)
        mostrarAsignaturas(profesor1);

        System.out.println("--------------Ejercicio D)-2)-----------------");
        System.out.println("Ingrese la asignatura que quiera saber el profesor y los estudiantes: ");
        int asignaturaOpcion = sc.nextInt();

        System.out.println("Profesor: " + asignaturas.get(asignaturaOpcion).instructor.nombre);
        System.out.println("Estudiantes ");

        for (Estudiante estudiante : estudiantes) {
            for(Inscripcion inscripcion : estudiante.formulario){
                if (inscripcion.en.getCodigo().equals(asignaturas.get(asignaturaOpcion).getCodigo())){
                    System.out.println("Nombre: " + estudiante.nombre);
                }
            }
        }

        System.out.println("--------------Ejercicio E)-1)-2)-----------------");

        for (Inscripcion inscripcion : estudiante1.formulario){ //Ejercicio E) - 1) - 2)
            System.out.println("Estudiante: " + estudiante1.nombre);
            System.out.println("Profesor: " + inscripcion.en.instructor.nombre + ", Asignatura: " + inscripcion.en.getCodigo() + ", Fecha: " + inscripcion.getFecha());
        }

        System.out.println("--------------Ejercicio F)-1)-----------------"); //Ejercicio F)-1)
        System.out.println("Inscripcion 1: " + inscripcion1.inscripto.get(1));
        System.out.println("Inscripcion 2: " + inscripcion2.inscripto.get(2));
        System.out.println("Inscripcion 3: " + inscripcion3.inscripto.get(3));

        System.out.println("--------------Ejercicio F)-2)-----------------"); //Ejercicio F)-2)
        System.out.println("Inscripcion 1 (fecha): " + inscripcion1.getFecha() + " Profesor: " + inscripcion1.en.instructor.nombre);
        System.out.println("Inscripcion 2 (fecha): " + inscripcion2.getFecha() + " Profesor: " + inscripcion2.en.instructor.nombre);
        System.out.println("Inscripcion 3 (fecha): " + inscripcion3.getFecha() + " Profesor: " + inscripcion2.en.instructor.nombre);

        System.out.println("--------------Ejercicio F)-3)-----------------"); //Ejercicio F)-3)
        System.out.println("Ingrese el legajo de un alumno: ");
        int legajo = sc.nextInt();

        for (Estudiante estudiante: estudiantes){
            if (estudiante.legajo.equals(legajo)){
                System.out.println("Asignaturas: ");
                for (Inscripcion inscripcion: estudiante.formulario){
                    System.out.println(inscripcion.en.getCodigo());
                }
            }
        }

    }

    public static void mostrarAsignaturas(Profesor profesor){
        System.out.println("Asignaturas:");
        for (Asignatura asignatura : profesor.curso){
            System.out.println(asignatura.getCodigo());
        }
    }
}