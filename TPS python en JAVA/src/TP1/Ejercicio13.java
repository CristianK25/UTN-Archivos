package TP1;

import java.util.InputMismatchException;
import java.util.Scanner;

/**
 *
 * @author windows
 */
public class Ejercicio13 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        boolean entradaValida = false;
        int numero = 0;
        int div = 0;
        do{
            try{
                System.out.println("Ingrese un numero");
                numero = new Scanner(System.in).nextInt();
                entradaValida = true;
            }catch(InputMismatchException e){
                System.out.println("Valor invalido");
            }
        }while (!entradaValida);

        if (numero<=1){
            System.out.println("No es primo");
        }else{
            for (int i=1;i<numero;i++){
                if (numero%i==0){
                    div++;
                }else if(div > 2){
                    System.out.println("No es primo");
                    break;
                }
            }
            if (div <= 2){
                System.out.println("Es primo");
            }
        }

    }

}
