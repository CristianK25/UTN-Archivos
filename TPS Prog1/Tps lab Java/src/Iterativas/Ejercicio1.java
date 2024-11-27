package Iterativas;

import java.util.Scanner;

/*
Ejercicio 1: Cálculo del tiempo dedicado a cada actividad
Un alumno quiere medir el tiempo total que dedica a sus actividades académicas y personales durante el día.
Instrucciones:
Pide al usuario que ingrese las horas dedicadas a cada actividad: estudiar, hacer ejercicios, leer, y tiempo libre.
Usa un bucle para registrar las horas y luego calcula el tiempo total dedicado.

 */
public class Ejercicio1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int suma=0,i=0;
        String []actividades = {"Ejercicios","Leer","Tiempo libre"};
        while (i<actividades.length) {
            System.out.printf("Ingrese horas dedicadas a %s: ",actividades[i]);
            int hora = sc.nextInt();
            suma += hora;
            i++;
        }
        System.out.println("La cantidad de horas totales: "+suma);
    }
}
