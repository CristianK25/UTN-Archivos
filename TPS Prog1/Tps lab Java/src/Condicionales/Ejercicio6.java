package Condicionales;

import java.util.Scanner;

/*
Escribe un programa que pida al usuario cuántas horas al día duerme, cuántas horas al día hace
ejercicio y cuántas comidas saludables consume al día. Luego, imprime una evaluación de sus
hábitos saludables basada en estos datos.

 */
public class Ejercicio6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int horasSueño, comidasSaludables, horasEj;
        String evaluacion = "";

        System.out.println("Introduzca las horas de sueño: ");
        horasSueño = sc.nextInt();

        System.out.println("Introduza las horas de ejercicio al dia: ");
        horasEj = sc.nextInt();

        System.out.println("Introduzca las comidas saludables por dia: ");
        comidasSaludables = sc.nextInt();


        if (horasSueño > 8){
            evaluacion += "Muchas horas de sueño";
        } else if (horasSueño >= 6) {
            evaluacion += "Horas de sueño mejorables";
        }else{
            evaluacion += "Horas de sueño deplorables";
        }

        if (horasEj >= 8){
            evaluacion += "Muchas horas de ejercicio";
        } else if (horasSueño >= 4) {
            evaluacion += "Horas de ejercicio saludables";
        }else{
            evaluacion += "Horas de ejercicio justas";
        }

        if (horasSueño >6){
            evaluacion += "Muchas comidas al dia";
        } else if (horasSueño >= 3) {
            evaluacion += "Buena cantidad de comidas al dia";
        }else{
            evaluacion += "Falta de cantidad de comidas al dia";
        }

        System.out.println(evaluacion);
    }
}
