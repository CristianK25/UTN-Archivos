package Funciones;

import java.util.Scanner;

/*
Una pequeña empresa de servicios tiene una lista de clientes a los que debe enviar facturas, pero quiere procesar solo aquellos que tengan facturas pendientes por más de $500.

**Instrucciones**:
- Crea un arreglo `clientes` que almacene los nombres de los clientes y un arreglo `facturasPendientes` con el monto de sus facturas pendientes.
- Escribe una función `enviarFacturas` que imprima los nombres de los clientes con facturas mayores a $500.

 */
public class Ejercicio3 {
    static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {

        String clientes[] = new String[5];
        int facturasPendientes[] = new int[5];
        llenarClientesFacturas(clientes,facturasPendientes);
        enviarFacturas(clientes,facturasPendientes);
    }
    public static void llenarClientesFacturas(String[] clientes,int[] facturasPendientes) {
        for (int i = 0; i < clientes.length; i++) {
            System.out.println("Ingresar nombre cliente "+ (i+1));
            clientes[i] = sc.nextLine();
            System.out.println("Ingresar su factura");
            facturasPendientes[i] = sc.nextInt();
            sc.nextLine();
        }
    }
    public static void enviarFacturas(String[] clientes,int[] facturasPendientes) {
        for (int i = 0; i < facturasPendientes.length; i++) {
            if (facturasPendientes[i] > 500){
                System.out.printf("Empleado %s mayor a 500\n",clientes[i]);
            }
        }
    }
}
