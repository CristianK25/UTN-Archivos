package TP1;

import java.util.Scanner;

public class Ejercicio15 {
    public static void main(String[] args) {
        System.out.println("Ingrese un numero");
        int num = new Scanner(System.in).nextInt();
        int suma = 0;
        boolean div2 = false,div3=false;

        //Divisibilidad 2
        if (num%2==0){
            System.out.println("Es divisible por 2");
            div2 = true;
        }
        //Divisibilidad 3
        String numString = Integer.toString(num);
        for (int i=0;i<numString.length();i++){
            char caracter = numString.charAt(i);
            int cifra = Character.getNumericValue(caracter);
            suma += cifra;
        }
        if (suma%3==0){
            System.out.println("Es divisible por 3");
            div3 = true;
        }
        //Divisibilidad 5
        if (num/10 == 0 || num/10 == 5){
            System.out.println("Es divisible por 5");
        }
        //Divisibilidad 6
        if (div2 && div3){
            System.out.println("Es divisible por 6");
        }
        //Divisibilidad 9
        suma =0;
        for (int i=0;i<numString.length();i++){
            char caracter = numString.charAt(i);
            int cifra = Character.getNumericValue(caracter);
            suma += cifra;
        }
        if(suma ==9 || suma %9==0){
            System.out.println("Es divisible por 9");
        }
        //Divisibilidad 10
        if (num/10 == 0){
            System.out.println("Es divisible por 10");
        }
    }
}
