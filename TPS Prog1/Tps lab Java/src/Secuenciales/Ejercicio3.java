package Secuenciales;

import java.util.Scanner;

/*
Escribe un programa que pida al usuario su nivel de condición física (principiante, intermedio,
avanzado) y luego genere una rutina de ejercicio semanal con diferentes tipos de ejercicios y
duraciones.
 */
public class Ejercicio3 {
    public static void main(String[] args) {
        System.out.println("Ingrese su condicion fisica");
        System.out.println("1_Principiante\n2_Intermedio\n3_Avanzado");
        int condicion = new Scanner(System.in).nextInt();

        switch (condicion) {
            case 1:
                System.out.println("Dos dias a la semana. Trotar, sentadillas y mancuernas");
                break;
            case 2:
                System.out.println("Cuatro dias a la semana. Trotar, burpees y dominadas");
                break;
            case 3:
                System.out.println("Todos los dias a la semana. Correr, burpees y press banca");
        }
    }
}
