package Secuenciales;

import java.util.Scanner;

/*
Escribe un programa que pida al usuario varios factores de felicidad (nivel de satisfacción con la
vida, nivel de estrés, nivel de salud, etc.) en una escala del 1 al 10 y luego calcule e imprima un
índice de felicidad basado en esos factores.
 */
public class Ejercicio7 {
    public static void main(String[] args) {
        System.out.println("Calculador de felicidad del 1 al 10");



        System.out.println("Ingrese un nivel de satisfacion de vida: ");
        int satisfacion = new Scanner(System.in).nextInt();

        System.out.println("Ingrese un nivel de estres de vida: ");
        int estres = new Scanner(System.in).nextInt();

        System.out.println("Ingrese un nivel de salud de vida: ");
        int salud = new Scanner(System.in).nextInt();

        System.out.println("Nivel de felicidad basado en lo anterior: "+ ((satisfacion+salud-estres)/2));

    }
}
