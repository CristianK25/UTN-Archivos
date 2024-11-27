package ClasePersona;

public class Persona {
    private String nombre;
    private String apellido;
    private String numeroDocumento;
    private int añoNacimiento;
    private String pais;
    private char genero;

    public Persona(String nombre, String apellido, String numeroDocumento, int añoNacimiento, String pais, char genero) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.numeroDocumento = numeroDocumento;
        this.añoNacimiento = añoNacimiento;
        this.pais = pais;
        this.genero = genero;
    }

    public void imprimir(){
        System.out.println("Nombre: " + nombre);
        System.out.println("Apellido: " + apellido);
        System.out.println("Numero documento: " + numeroDocumento);
        System.out.println("Año de nacimiento: "+ añoNacimiento);
        System.out.println("Pais: " + pais);
        System.out.println("Genero: " + genero);
        System.out.println("---------------\n");
    }
}
