package Condicionales;

import java.util.Arrays;
import java.util.Scanner;

/*
Escribe un programa que pida al usuario el precio de un producto y la categoría del cliente
(estudiante, adulto, jubilado). Aplica un descuento del 10% para estudiantes, 5% para adultos y
15% para jubilados. Imprime el precio final después del descuento.
 */
public class Ejercicio2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Ingrese el precio del producto: ");
        double precio = sc.nextDouble();
        System.out.println("Ingrese categoria del cliente: ");
        String categoria = sc.next();
        switch (categoria){
            case "estudiante":
                System.out.printf("Precio final siendo %s es de %f",categoria,precio*0.90);break;
            case "adultos":
                System.out.printf("Precio final siendo %s es de %f",categoria,precio*0.95);break;
            case "jubilados":
                System.out.printf("Precio final siendo %s es de %f",categoria,precio*0.85);break;
                default:
                    System.out.println("No hay descuento");
        }

    }
}
