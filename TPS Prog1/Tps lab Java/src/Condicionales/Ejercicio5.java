package Condicionales;

/*
Escribe un programa que pida al usuario que elija entre piedra, papel o tijera. Luego, el programa
elige una opción al azar y determina quién gana. Imprime el resultado del juego.
 */

import java.util.Random;
import java.util.Scanner;

public class Ejercicio5 {
    public static void main(String[] args) {
        Random random = new Random();
        int eleccion;
        String eleccionString;
        System.out.println("Ingrese una opcion entre \n1_Piedra\n2_Papel\n3_Tijera");
        do{
            eleccion = new Scanner(System.in).nextInt();
        }while (!(eleccion ==1 || eleccion ==2 || eleccion ==3 ));

        int numeroRandom = random.nextInt(1,3);

        String eleccionPrograma = "";

        if (numeroRandom == 0) {
            eleccionPrograma = "piedra";
        } else if (numeroRandom == 1) {
            eleccionPrograma = "papel";
        } else {
            eleccionPrograma = "tijera";
        }
        if (eleccion == 1) {
            eleccionString = "piedra";
        } else if (eleccion == 2) {
            eleccionString = "papel";
        } else {
            eleccionString = "tijera";
        }

        System.out.println("Tú elegiste: " + eleccionString);
        System.out.println("El programa eligió: " + eleccionPrograma);

        if (eleccionString.equals(eleccionPrograma)) {
            System.out.println("¡Es un empate!");
        } else if ((eleccionString.equals("piedra") && eleccionPrograma.equals("tijera")) ||
                (eleccionString.equals("papel") && eleccionPrograma.equals("piedra")) ||
                (eleccionString.equals("tijera") && eleccionPrograma.equals("papel"))) {
            System.out.println("¡Ganaste!");
        } else {
            System.out.println("¡El programa ganó!");
        }
    }
}
