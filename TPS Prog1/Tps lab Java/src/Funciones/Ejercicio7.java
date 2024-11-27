package Funciones;

import java.util.Arrays;
import java.util.Scanner;

/*
Una tienda de ropa ofrece un 15% de descuento a las compras superiores a $500.

**Instrucciones**:
- Crea un arreglo `compras` que almacene los montos de las compras de los clientes.
- Escribe una función `aplicarDescuento` que aplique el descuento a las compras que superen los $500.

 */
public class Ejercicio7 {
    static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {
        double[] compras = {550,40,100,1500,750};
        System.out.println("Compras de los clientes: "+ Arrays.toString(compras));
        aplicarDescuento(compras);
    }
    public static void aplicarDescuento(double []compras){
        System.out.println("\n----------\n\tClientes con el 21% de descuento");
        for (int i=0;i<compras.length;i++){
            if(compras[i] > 500){
                System.out.printf("Monto %d) de %.3f$ supera los 500\n",i+1,compras[i]);
                compras[i] *= 0.85;
                System.out.println("Monto "+(i+1)+") con el descuento\n: "+compras[i]);
            }
        }
    }
}
