package Secuenciales;

/*
Escribe un programa que pida al usuario su estado de ánimo (feliz, triste, enérgico, relajado)
 y luego
genere una lista de reproducción con canciones sugeridas para ese estado de ánimo
 */

import java.util.Scanner;

public class Ejercicio4 {
    public static void main(String[] args) {
        System.out.println("Ingrese su estado de animo");
        System.out.println("1_Feliz\n2_Triste\n3_Energico\n4_Relajado");
        int animo = new Scanner(System.in).nextInt();

        switch (animo) {
            case 1:
                System.out.println("Ustes esta feliz. Escuche Happy de Pharrel Williams");break;
            case 2:
                System.out.println("Ustes esta triste. Escuche See you again");break;
            case 3:
                System.out.println("Ustes esta energico. Escuche Given up de linkin park");break;
            case 4:
                System.out.println("Ustes esta relajado. Escuche Expresso de Sabrina Carpenter");break;
                default:
                    System.out.println("No es un estado de animo valido");
        }
    }
}
