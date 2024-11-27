package Funciones;

import java.util.Scanner;

/*
Una empresa ofrece descuentos a sus clientes dependiendo de la cantidad de compras que han realizado. Si han comprado más de 10 veces, reciben un 10% de descuento.

**Instrucciones**:
- Crea un arreglo `clientes` y otro `compras` que almacene la cantidad de compras de cada cliente.
- Escribe una función `calcularDescuentos` que recorra el arreglo y aplique el descuento a los clientes que califiquen.

 */
public class Ejercicio4 {
    static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {
        String clientes[] = new String[5];
        int compras[] = new int[5];
        llenarClientesCompras(clientes,compras);
        System.out.println("\tCon una compra mayor a 10 unidades se lleva un descuento del 50%\n-----------\n--Clientes con descuento--\n");
        calcularDescuentos(clientes,compras);
    }
    public static void llenarClientesCompras(String[] clientes,int[] compras) {
        for (int i = 0; i < clientes.length; i++) {
            System.out.println("Ingresar nombre cliente "+ (i+1));
            clientes[i] = sc.nextLine();
            System.out.println("Ingresar la cantidad de compras realizadas");
            compras[i] = sc.nextInt();
            sc.nextLine();
        }
    }
    public static void calcularDescuentos(String[] clientes,int[] compras) {
        for (int i = 0; i < compras.length; i++) {
            if (compras[i] > 10){
                System.out.printf("Cliente %s recibe descuento del %s\n",clientes[i],"50%");
            }
        }
    }
}
