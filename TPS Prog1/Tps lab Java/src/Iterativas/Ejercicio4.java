package Iterativas;

import java.util.Scanner;

/*
Una tienda desea registrar las ventas realizadas cada día durante una semana. El programa debe calcular el total de ventas al final de la semana.
Instrucciones:
Usa un bucle para registrar las ventas diarias durante 7 días.
Al final del bucle, muestra el total de ventas de la semana.

 */
public class Ejercicio4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int dia,i=0;
        float suma=0;
        System.out.println("Ventas por dia");
        do{
            System.out.println("Ingrese las ventas del dia "+(i+1)+": ");
            suma += sc.nextFloat();
            i++;
        } while(i<7);
        System.out.println("La suma de las ventas es: "+suma);
    }
}
