package TP1;

import java.util.Random;
import java.util.Scanner;

/**
 *
 * @author windows
 */
public class Ejercicio14 {

    public static void main(String[] args) {
        Random random = new Random();
        int numero = random.nextInt(11);
        int intentos = 0;
        System.out.println("Adivina el numero");
        int nro;
        do {
            intentos++;
            nro = new Scanner(System.in).nextInt();
            if (nro < numero) {
                System.out.println("Mas arriba");
            } else {
                System.out.println("Mas abajo");
            }
        } while (nro != numero);
    }

}