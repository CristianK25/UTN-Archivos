package Funciones;

import java.util.Arrays;
import java.util.Scanner;

/*
Una pequeña empresa debe calcular el impuesto de venta para cada una de las facturas emitidas.

**Instrucciones**:
- Crea un arreglo `facturas` con los montos de las facturas de los clientes.
- Escribe una función `calcularImpuesto` que aplique un 21% de impuesto a cada factura.

 */
public class Ejercicio6 {
    static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {
        double[] facturas = {2000,4000,5500,15050,7550};
        System.out.println("Facturas de los clientes: "+ Arrays.toString(facturas));
        calcularImpuesto(facturas);
    }
    public static void calcularImpuesto(double []facturas){
        System.out.println("\n----------\n\tClientes con el 21% de descuento");
        for (int i=0;i<facturas.length;i++){
            facturas[i] *= 1.21;
            System.out.println("Factura con impuesto al cliente "+(i+1)+"): "+facturas[i]);
        }
    }
}
