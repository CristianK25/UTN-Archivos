package HerenciaYPolimorfismo.ReservasDeVuelos;

import javax.swing.*;

public class SistemaDeReservas {
    private static Reservas reservas = new Reservas();

    public static void main(String[] args) {
        String saludo = "Hay dos promociones disponibles\n¡¡Si elige el vuelo Charter hay un 10% de descuento\n" +
                "¡¡Si elige el vuelo regular, tiene un 15% de descuento con 50 asientos o mas";
        JOptionPane.showMessageDialog(null, saludo,"Bienvenido a Areolineas X", JOptionPane.PLAIN_MESSAGE);
        ingresarVuelos();
        mostrarReservas();
    }
    public static void ingresarVuelos(){
        int reinicio;
        String[] tiposdeVuelos = {"Vuelo Charter", "Vuelo Regular"};
        do{
            int numero = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el numero del vuelo"));
            String origen = JOptionPane.showInputDialog("Ingrese el origen del vuelo");
            String destino = JOptionPane.showInputDialog("Ingrese el destino del vuelo");
            String fecha = JOptionPane.showInputDialog("Ingrese la fecha del vuelo");
            int opcion = JOptionPane.showOptionDialog(null,"Eliga un tipo de vuelo","TIPOS DE VUELO", JOptionPane.DEFAULT_OPTION, JOptionPane.INFORMATION_MESSAGE,null, tiposdeVuelos, tiposdeVuelos);
            if (opcion == 0){
                int precioTotal = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el precio del vuelo"));
                VueloCharter vueloCharter = new VueloCharter(numero,origen,destino,fecha,precioTotal);
                reservas.agregarVuelos(vueloCharter);
            }else{
                int nroAsientos = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el nro de asientos"));
                int precio = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el precio del vuelo"));
                VueloRegular vueloRegular = new VueloRegular(numero,origen,destino,fecha,nroAsientos,precio);
                reservas.agregarVuelos(vueloRegular);
            }
            reinicio = JOptionPane.showConfirmDialog(null,"¿Desea ingresar otro vuelo?","VUELO",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
        }while (reinicio == 0);
    }
    public static void mostrarReservas(){
        System.out.println("El total de reservas es: "+ reservas.calcularTotalReservas());
        reservas.mostrarVuelos();
    }
}