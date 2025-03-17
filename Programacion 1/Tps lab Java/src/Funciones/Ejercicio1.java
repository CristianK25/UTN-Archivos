package Funciones;

import java.util.Scanner;

/*
Una pequeña tienda registra sus ventas diarias en un arreglo. Se necesita escribir una función que use un bucle para calcular los ingresos totales mensuales.

**Instrucciones**:
- Crea un arreglo `ventas` que almacene las ventas diarias de una tienda durante 30 días.
- Escribe una función `calcularIngresosMensuales` que recorra el arreglo y sume las ventas.
- Imprime el total de ingresos mensuales.

 */
public class Ejercicio1 {
    static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {
        float ventas[] = new float[30];
        System.out.println("Ventas totales del mes: "+ calcularIngresosMensuales(ventas));
    }

    public static float calcularIngresosMensuales(float[] ventas) {
        float suma = 0;
        for (int i = 0; i < ventas.length; i++) {
            System.out.println("Ingrese las ventas del dia "+(i+1));
            ventas[i] = sc.nextFloat();
            suma += ventas[i];
        }
        return suma;
    }
}
