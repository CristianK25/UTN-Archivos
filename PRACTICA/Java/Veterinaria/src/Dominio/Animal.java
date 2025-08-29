package Dominio;

import java.time.LocalDate;

public abstract class Animal {
    private String nombre;
    private int edad;
    private LocalDate fechaNacimiento;
    private EstadoAnimal estado;
    private Duenio duenio;
    private FichaMedica fichaMedica;

    public Animal(String nombre, int edad, LocalDate fechaNacimiento, EstadoAnimal estado, Duenio duenio) {
        this.nombre = nombre;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.estado = estado;
        this.duenio = duenio;
        this.fichaMedica = new FichaMedica();
    }

    public Animal() {
        this.fichaMedica = new FichaMedica();
    }

    public String getNombre() {
        return nombre;
    }

    //Polimorfismo
    public abstract String emitirSonido();
    public abstract String getDieta();
    public abstract boolean neesitaVacunaAnual();
}
