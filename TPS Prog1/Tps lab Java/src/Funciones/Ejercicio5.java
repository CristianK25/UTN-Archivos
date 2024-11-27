package Funciones;

import java.util.Arrays;
import java.util.Scanner;

/*
Una empresa desea conocer el promedio de satisfacción de sus clientes basado en encuestas de calificación de 1 a 5.

**Instrucciones**:
- Crea un arreglo `calificaciones` con las puntuaciones de satisfacción de los clientes.
- Escribe una función `calcularPromedioSatisfaccion` que recorra el arreglo y calcule el promedio de satisfacción

 */
public class Ejercicio5 {
    static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {
        int calificaciones[] = {5,2,3,4,2,3,4};
        System.out.println("Calificaciones de los clientes: "+Arrays.toString(calificaciones));
        System.out.println("El promedio de satisfacion de los clientes es de: "+calcularPromedioSatisfaccion(calificaciones));
    }
    public static int calcularPromedioSatisfaccion(int calificaciones[]){
        int suma =0;
        for (int i = 0; i < calificaciones.length; i++) {
            suma += calificaciones[i];
        }
        return suma/calificaciones.length;
    }
}
