package Iterativas;

import java.util.Scanner;

/*
Ejercicio 2: Cálculo de salarios semanales
Una empresa desea calcular el salario semanal de sus empleados basándose en las horas trabajadas y una tarifa fija por hora.
Instrucciones:
Pide al usuario ingresar la cantidad de empleados.
Para cada empleado, pide ingresar las horas trabajadas.
Usa un bucle para calcular el salario de cada empleado (suponiendo una tarifa fija de $15 por hora).

 */
public class Ejercicio2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int tarifa = 15;
        System.out.println("Defina la cantidad de empleados: ");
        int cantEmpleados = sc.nextInt();
        int[] empleados = new int [cantEmpleados];
        for (int i = 0; i < cantEmpleados; i++) {
            System.out.printf("Ingrese las horas trabajadas del empleado %d: \n",i+1 );
            empleados[i] = sc.nextInt();
            empleados[i] = empleados[i] * tarifa;
        }
        for (int i = 0; i < cantEmpleados; i++) {
            System.out.println("Salario del empleado "+(i+1)+": "+empleados[i]);
        }
    }
}
