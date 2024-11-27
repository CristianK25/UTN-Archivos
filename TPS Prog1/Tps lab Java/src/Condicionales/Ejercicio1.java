package Condicionales;

import java.util.Scanner;

/*
Escribe un programa que pida al usuario su género de película favorito (acción, comedia, drama,
ciencia ficción) y luego recomiende una película basada en su elección.
 */
public class Ejercicio1 {
    public static void main(String[] args) {
        String Libro;
        do {
            System.out.println("Ingrese su genero de pelicula favorita (acción, comedia, drama, ciencia ficción)");
            Libro = new Scanner(System.in).nextLine().toLowerCase();
        }while ( !(Libro.equals("accion") || Libro.equals("comedia") || Libro.equals("ciencia ficcion") || Libro.equals("drama")));

        switch (Libro){
            case "accion":
                System.out.println("Vea duro de matar");
                break;
            case "comedia":
                System.out.println("Vea mentiroso mentiroso");
                break;
            case "drama":
                System.out.println("Vea La vida es bella");
                break;
            case "ciencia ficcion":
                System.out.println("Vea Star Wars");
                break;
                default:
                    System.out.println("NO es un genero de pelicula");
        }
    }
}
