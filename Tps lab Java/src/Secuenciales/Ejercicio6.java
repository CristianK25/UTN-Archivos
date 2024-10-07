package Secuenciales;

import java.util.Scanner;

/*
Escribe un programa que pida al usuario cuántas horas al día puede estudiar y luego genere un
plan de estudio semanal distribuyendo esas horas en diferentes materias.
 */
public class Ejercicio6 {
    public static void main(String[] args) {
        System.out.println("Ingrese la cantidad de horas de estudio al dia: ");
        float cantHoras = new Scanner(System.in).nextFloat();
        System.out.println("Distrubuyendo horarios en materias(Matematica/Fisica/Programacion/Literatura/Quimica");

        System.out.printf("Lunes: Matematica %.3fhs y Programacion %.1fhs\n",cantHoras*0.30,cantHoras*0.70);
        System.out.printf("Martes: Matematica %.3fhs y Fisica %.1fhs\n",cantHoras*0.7,cantHoras*0.30);
        System.out.printf("Miercoles: Fisica %.3fhs y Literatura %.1fhs\n",cantHoras*0.7,cantHoras*0.30);
        System.out.printf("Jueves: Literatura %.3fhs y Quimica %.1fhs\n",cantHoras*0.7,cantHoras*0.30);
        System.out.printf("Viernes: Matematica %.3fhs y Programacion %.1fhs\n",cantHoras*0.50,cantHoras*0.5);
        System.out.print("Sabado: Descanso\n");
        System.out.print("Domingo: Descanso");

        }
}
