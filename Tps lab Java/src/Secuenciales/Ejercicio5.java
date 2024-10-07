package Secuenciales;

import javax.swing.*;
import java.util.Scanner;

/*
Escribe un programa que pida al usuario la distancia del viaje en kilómetros, el consumo de
combustible del vehículo en litros por kilómetro y el precio del combustible por litro, y luego
calcule e imprima el costo total del viaje.
 */
public class Ejercicio5 {
    public static void main(String[] args) {
        float km,consumo,precioComb;
        Scanner sc = new Scanner(System.in);
        System.out.println("Ingrese la distancia del viaje en km: ");
         km = sc.nextFloat();
        System.out.println("Ingrese el valor de consumo de combustible l/km: ");
        consumo = sc.nextFloat();
        System.out.println("Ingrese el precio de combustible l/km: ");
        precioComb = sc.nextFloat();

        JOptionPane.showMessageDialog(null, "hola");
        System.out.printf("Costo total del viaje: %.2f",consumo*km*precioComb);
    }
}
