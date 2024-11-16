package HerenciaYPolimorfismo.SistemaDePagos;

import javax.swing.*;

public class Paypal extends MetodoPago implements Cancelable{
    private String correoElectronico;

    public Paypal(String titular, int numero,String correoElectronico) {
        super(titular, numero);
        this.correoElectronico = correoElectronico;
    }



    @Override
    public void realizarPago() {
        JOptionPane.showMessageDialog(null,"Pago Realizado con Paypal\nNumero del Pago:" + numero);
    }

    @Override
    public void cancelarPago() {
        JOptionPane.showMessageDialog(null,"Pago Cancelado desde Paypal\nNumero del Pago:" + numero);
    }

    @Override
    public String toString() {
        return "Metodo: Paypal" +
                "\n\tTitular = '" + titular + '\'' +
                "\n\tNumero = " + numero +
                "\n\tCorreo Electronico = '" + correoElectronico;
    }
}
