package HerenciaYPolimorfismo.SistemaDePagos;

import javax.swing.*;

public class SistemadePagos {
    private static Pagos pagos = new Pagos();
    public static void main(String[] args) {
        agregarMetodo();
        elegirOperacion();
    }

    public static void agregarMetodo(){
        String[] opciones = {"Tarjeta de Credito","Paypal"};
        int reinicio;
        do{
            int opcion = JOptionPane.showOptionDialog(null,"Eliga una opcion de Pago","METODO",JOptionPane.DEFAULT_OPTION,JOptionPane.INFORMATION_MESSAGE,null,opciones,null);
            String titular = JOptionPane.showInputDialog(null,"Ingrese el titular","TITULAR",JOptionPane.INFORMATION_MESSAGE);
            int numero = Integer.parseInt(JOptionPane.showInputDialog(null,"Ingrese el numero","NUMERO",JOptionPane.INFORMATION_MESSAGE));
            if (opcion == 0) {
                String fechaExpiracion = JOptionPane.showInputDialog(null, "Ingrese la fecha de expiracion", "FECHA", JOptionPane.INFORMATION_MESSAGE);
                String codigoSeguridad = JOptionPane.showInputDialog(null, "Ingrese el codigo de seguridad", "CODIGO", JOptionPane.INFORMATION_MESSAGE);
                TarjetaCredito pago = new TarjetaCredito(titular,numero,fechaExpiracion,codigoSeguridad);
                pagos.agregarMetodo(pago);
            }else{
                String correo = JOptionPane.showInputDialog(null,"Ingrese el correo","CORREO",JOptionPane.INFORMATION_MESSAGE);
                Paypal pago = new Paypal(titular,numero,correo);
                pagos.agregarMetodo(pago);
            }
            reinicio = JOptionPane.showConfirmDialog(null,"¿Desea ingresar otro metodo de pago?","REINICIO",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
        }while (reinicio == 0);
    }

    public static void elegirOperacion(){
        String[] opciones = {"Realizar Pago","Cancelar Pago","Mostrar Pagos","Salir"};
        int reinicio;
        do{
            reinicio = JOptionPane.showOptionDialog(null,"Eliga una operacion","Operaciones",
                    JOptionPane.DEFAULT_OPTION,JOptionPane.QUESTION_MESSAGE,null,opciones,opciones[0]);
            if (reinicio != 3 && reinicio!=2){
                String decision = "Ingrese el numero de cuenta para "+ opciones[reinicio];
                int numero = Integer.parseInt(JOptionPane.showInputDialog(decision));
                switch (reinicio){
                    case 0:
                        pagos.realizarPago(numero);
                        break;
                    case 1:
                        pagos.cancelarPagos(numero);
                        break;
                }
            } else if (reinicio == 2) {
                pagos.mostrarPagos();
            }
        }while(reinicio !=3);
        System.out.println("Programa FINALIZADO");

    }
}
