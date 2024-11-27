package Funciones;

import java.util.Arrays;

/*
Una empresa de servicios necesita llevar el control de las horas trabajadas por sus empleados durante una semana.

**Instrucciones**:
- Crea un arreglo `empleados` con los nombres de los empleados y otro arreglo `horasTrabajadas` con las horas trabajadas en la semana.
- Escribe una función `calcularPagoSemanal` que calcule el pago semanal (a razón de $15 por hora trabajada).

 */
public class Ejercicio8 {
    public static void main(String[] args) {
        String empleados[] = {"Cristian","Juan","Carlos","Lorenzo","Joaquin"};
        int horasTrabajadas[] = {15,20,55,45,10};
        System.out.println("Empleados: "+ Arrays.toString(empleados));
        System.out.println("Sus horas trabajadas: "+ Arrays.toString(horasTrabajadas));
        System.out.println("--------------");
        calcularPagoSemanal(empleados,horasTrabajadas);
    }
    public static void calcularPagoSemanal(String[] empleados,int[] horasTrabajadas) {
        for (int i = 0; i < empleados.length; i++) {
            System.out.printf("Al empleado %s le corresponden %d$\n", empleados[i], horasTrabajadas[i]*15);
        }
    }

}
