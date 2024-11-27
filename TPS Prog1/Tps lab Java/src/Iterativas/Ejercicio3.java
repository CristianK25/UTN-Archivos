package Iterativas;

import java.util.Scanner;

/*
Una tienda necesita revisar el inventario de sus productos y determinar si algún artículo tiene menos de 5 unidades disponibles para realizar un pedido.
Instrucciones:
Pide al usuario ingresar el número de productos.
Usa un bucle para ingresar la cantidad disponible de cada producto.
Si algún producto tiene menos de 5 unidades, muestra un mensaje indicando que es necesario realizar un pedido.

 */
public class Ejercicio3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int stock, nroProductos;
        System.out.println("Ingrese la cantidad de productos: ");
        nroProductos = sc.nextInt();
        for (int i=1;i <= nroProductos;i++){
            System.out.println("Ingrese el stock del producto "+(i+1)+": ");
            stock = sc.nextInt();
            if (stock < 5){
                System.out.println("El producto "+(i+1)+" necesita realizar un pedido");
            }
        }
    }
}
