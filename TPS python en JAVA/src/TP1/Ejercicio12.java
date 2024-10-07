package TP1;

import java.util.InputMismatchException;
import java.util.Scanner;

/**
 *
 * @author windows
 */
public class Ejercicio12 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int dia=0;

        do{
            while(true){
                try{
                    System.out.println("Ingrese un numero entero: ");
                    dia = new Scanner(System.in).nextInt();
                    break;
                }catch(InputMismatchException e){
                    System.out.println("Error. Valor invalido");
                }
            }

        }while(dia >=7 && dia <=1);

        switch (dia){
            case 1,2,3,4,5:System.out.println("Dia laboral");
            default: System.out.println("Dia no laboral");
        }
    }
}