package Condicionales;

import java.util.Scanner;

/*
Escribe un programa que pida al usuario su género de libro favorito (fantasía, misterio, romance,
ciencia ficción) y luego recomiende un libro basado en su elección.
 */
public class Ejercicio3 {
    public static void main(String[] args) {
        String Libro;
        do {
            System.out.println("Ingrese su genero de libro favorita (fantasía, misterio, romance,ciencia ficción)");
            Libro = new Scanner(System.in).nextLine().toLowerCase();
        }while ( !(Libro.equals("fantasia") || Libro.equals("misterio") || Libro.equals("romance") || Libro.equals("ciencia ficcion")));


        switch (Libro){
            case "fantasia":
                System.out.println("Lea Harry Potter");
                break;
            case "misterio":
                System.out.println("Lea Holly de Stephen King");
                break;
            case "romance":
                System.out.println("Lea El amor en tiempos de colera");
            case "ciencia ficcion":
                System.out.println("Lea DUNE");
                break;
            default:
                System.out.println("NO es un genero de libro");
        }
    }
}
