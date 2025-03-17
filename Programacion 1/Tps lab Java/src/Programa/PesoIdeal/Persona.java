package Programa.PesoIdeal;

public class Persona {
    private double altura;
    private double peso;
    private String nombre;
    private double edad;

    public Persona(String nombre, double peso, double altura) {
        this.nombre = nombre;
        this.peso = peso;
        this.altura = altura;
    }

    public double pesoIdeal(){
        return altura - 100 + ((edad / 10) * 0.9);
    }
}
