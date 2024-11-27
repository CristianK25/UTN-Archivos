package Condicionales;


import java.util.Scanner;

public class Ejercicio7 {
    public static void main(String[] args) {
        System.out.println("Ingrese su estado de animo");
        System.out.println("1_Feliz\n2_Triste\n3_Energico\n4_Relajado");
        int animo = new Scanner(System.in).nextInt();

        switch (animo) {
            case 1:
                System.out.println("Ustes esta feliz. Usted puede hacer la actividad que desee");break;
            case 2:
                System.out.println("Ustes esta triste. Vaya a divertirse como desee");break;
            case 3:
                System.out.println("Ustes esta energico. Relajese");break;
            case 4:
                System.out.println("Ustes esta relajado. Salga a jugar ");break;
            default:
                System.out.println("No es un estado de animo valido");
        }
    }
}
