package Funciones;
/*
Una tienda de electrónica necesita un informe del inventario, mostrando los productos que tienen menos de 5 unidades en stock.

**Instrucciones**:
- Crea un arreglo `productos` que almacene los nombres de los productos y otro arreglo `stocks` que almacene la cantidad de stock de cada producto.
- Escribe una función `generarReporteBajoStock` que imprima los productos con menos de 5 unidades.
 */
public class Ejercicio2 {
    public static void main(String[] args) {
        String[] productos = {"PlayStation", "Huawei", "RTX 4090", "i9 14gen", "Monitor"};
        int[] stocks = {4,5,5,1,3};
        generarReporteBajoStock(productos, stocks);
    }
    public static void generarReporteBajoStock(String[] productos, int[] stocks) {
        System.out.println("Productos con bajo stock:");
        for (int i = 0; i < productos.length; i++) {
            if (stocks[i] < 5) {
                System.out.println(productos[i] + " - Unidades: " + stocks[i]);
            }
        }
    }

}
