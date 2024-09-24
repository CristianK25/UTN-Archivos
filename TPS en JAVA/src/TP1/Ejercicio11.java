package TP1;

import java.util.Scanner;

/**
 *
 * @author windows
 */
public class Ejercicio11 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String contraseña = "KkkJamonSerrano";
        String intento;
        int intentos = 0;

        do{
            System.out.println("Adivine la contraseña");
            intento = new Scanner(System.in).nextLine();
            if (intento.equals(contraseña)){
                System.out.println("Lo lograste ");
                break;
            }else{
                intentos++;
            }
        }while(intentos <3);

    }

}
