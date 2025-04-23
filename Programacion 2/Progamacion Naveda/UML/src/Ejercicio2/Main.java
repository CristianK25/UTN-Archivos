package Ejercicio2;

import javax.swing.*;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);
    static Pais pais = new Pais();
    static boolean continuar =false;
    public static void main(String[] args) {
        agregar("Pais");
        agregar("Provincia");
        mostrarDatos();
    }

    public static void agregar(String cadena){
        boolean continuar = false;
        switch (cadena) {
            case "Pais":
                System.out.println("Ingrese el nombre del pais: ");
                pais.setNombre(sc.nextLine()); break;
            case "Provincia": agregarProvincia(); break;
        }
    }

    public static void agregarProvincia(){
        ArrayList<Provincia> provincias = new ArrayList<>();
        do {
            Provincia provincia = new Provincia(
                    JOptionPane.showInputDialog("Ingrese el nombre del provincia: ")
            );
            provincias.add(provincia);
            agregarCiudad(provincia);
            continuar = Boolean.parseBoolean(JOptionPane.showInputDialog("¿Continuar ingresando provincias?"));
        }while(continuar);
        pais.setProvincias(provincias);
    }

    public static void agregarCiudad(Provincia provincia) {
        ArrayList<Ciudad> ciudades = new ArrayList<>();
        do{
            Ciudad ciudad = new Ciudad(
                    JOptionPane.showInputDialog("Ingrese el nombre de la ciudad"),
                    Boolean.parseBoolean(JOptionPane.showInputDialog("¿Es capital?"))
            );
            ciudades.add(ciudad);
            continuar = Boolean.parseBoolean(JOptionPane.showInputDialog("¿Continuar ingresando ciudades?"));
        }while(continuar);
        provincia.setCiudades(ciudades);
    }

    public static void mostrarDatos(){
        pais.mostrarPais();
    }

}