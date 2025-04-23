package Secuenciales;

import java.util.Scanner;
/*
Escribe un programa que pida al usuario su peso en kilogramos, la duración del ejercicio en
minutos y el tipo de ejercicio (correr, nadar, andar en bicicleta), y luego calcule e imprima las
calorías quemadas. Utiliza diferentes tasas de calorías quemadas por minuto para cada tipo de
ejercicio.
 */

public class Ejercicio2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        float peso;
        int duracion, tipoEjercicio;

        System.out.println("Ingresa tu peso: ");
        peso = sc.nextFloat();

        System.out.println("Duracion del ejercicio: ");
        duracion = sc.nextInt();

        System.out.println("Tipo de ejercicio\n1_Correr(100 cal/min)\n2_Nadar(200 cal/min)\n3_Andar en bicicleta(300 cal/min)");
        tipoEjercicio = sc.nextInt();

        switch (tipoEjercicio) {
            case 1:
                System.out.printf("Calorias quemadas corriendo: %.2f",(float)duracion * 100);break;
            case 2:
                System.out.printf("Calorias quemadas nadando: %.2f",(float)duracion * 100);break;
            case 3:
                System.out.printf("Calorias quemadas andando en bici: %.2f",(float)duracion * 100);break;
        }
    }
}
