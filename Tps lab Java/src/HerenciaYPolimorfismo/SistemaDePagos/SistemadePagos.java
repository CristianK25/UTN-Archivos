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
        int opcion = 0;
        int numero = 0;
        do{
            opcion = JOptionPane.showOptionDialog(null,"Eliga una operacion","OPERACION",JOptionPane.DEFAULT_OPTION,JOptionPane.INFORMATION_MESSAGE,null,opciones,null);
            switch (opcion){
                case 1:
                    numero = Integer.parseInt(JOptionPane.showInputDialog(null,"Ingrese el numero del metodo para realizar "+opciones[opcion],"NUMERO PARA OPERACION",JOptionPane.INFORMATION_MESSAGE));
                    pagos.realizarPago(numero);
                    break;
                case 2:
                    numero = Integer.parseInt(JOptionPane.showInputDialog(null,"Ingrese el numero del metodo para realizar "+opciones[opcion],"NUMERO PARA OPERACION",JOptionPane.INFORMATION_MESSAGE));
                    pagos.cancelarPagos(numero);
                    break;
                case 3:
                    pagos.mostrarPagos();
                    break;
                default:
                    System.out.println("Salir");
            }
        }while (opcion !=4);
    }
}
