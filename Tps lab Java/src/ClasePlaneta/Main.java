package ClasePlaneta;

import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Planeta p1 = new Planeta("Tierra",1,5.9736E24,1.08321E12,12742,
                150000000,TipoPlaneta.TERRESTRE,true,1,1);
        Planeta p2 = new Planeta("Júpiter",95,1.898E27,1.4313E15,139820,
                750000000,TipoPlaneta.GASEOSO,true,11.86,0.4132);


        System.out.println(p1);
        System.out.printf("Densidad del planeta %s: %f\n",p1.getNombre(),p1.calcularDensidad());
        System.out.println("Planeta exterior al sistema solar? "+ p1.esExterior());
        System.out.println("-------------");

        System.out.println(p2);
        System.out.printf("Densidad del planeta %s: %f\n",p2.getNombre(),p2.calcularDensidad());
        System.out.println("Planeta exterior al sistema solar? "+ p2.esExterior());
    }
}
