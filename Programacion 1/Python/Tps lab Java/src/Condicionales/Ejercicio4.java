package Condicionales;

import java.util.Scanner;

/*
Escribe un programa que pida al usuario su peso en kilogramos y su altura en metros, y luego
calcule su Índice de Masa Corporal (IMC). Imprime una recomendación basada en el IMC (bajo
peso, peso normal, sobrepeso, obesidad).

 */
public class Ejercicio4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        float altura,peso,imc;
        System.out.println("Ingrese la altura: ");
        altura = sc.nextFloat();
        System.out.println("Ingrese la peso: ");
        peso = sc.nextFloat();
        imc = peso/(altura*altura);
        if( imc<18.5){
            System.out.println("bajo peso");
        }else if(imc>=18.5 && imc<25){
            System.out.println("peso normal");
        }else if(imc>=25 && imc<30){
            System.out.println("sobrepeso");
        }else if(imc>=30){
            System.out.println("obesidad");
        }
    }
}
