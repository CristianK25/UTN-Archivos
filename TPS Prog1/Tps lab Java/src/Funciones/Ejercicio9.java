package Funciones;

import java.util.Arrays;

/*
Una empresa quiere calcular el precio final de sus productos después de aplicar un descuento general del 10%.

**Instrucciones**:
- Crea un arreglo `preciosOriginales` que almacene el precio original de varios productos.
- Escribe una función `calcularPrecioFinal` que aplique el descuento a cada producto y devuelva el precio final.

 */
public class Ejercicio9 {
    public static void main(String[] args) {
        double[] preciosOriginales = {100,200,300,550,1500,2350,13500,25700};
        System.out.println("Precios originales: "+ Arrays.toString(preciosOriginales));
        preciosOriginales(preciosOriginales);
    }
    public static void preciosOriginales(double[] preciosOriginales) {
        for (int i = 0; i < preciosOriginales.length; i++) {
            System.out.printf("Precio %d con descuento: %.2f\n",i+1,preciosOriginales[i]*0.90);
        }
    }
}
