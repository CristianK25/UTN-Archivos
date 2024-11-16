package HerenciaYPolimorfismo.SistemaDePagos;

import javax.swing.*;

public class TarjetaCredito extends MetodoPago implements Cancelable{
    private String fechaExpiracion;
    private String codigoSeguridad;

    public TarjetaCredito(String titular, int numero,String fechaExpiracion, String codigoSeguridad) {
        super(titular, numero);
        this.fechaExpiracion = fechaExpiracion;
        this.codigoSeguridad = codigoSeguridad;
    }

    @Override
    public void realizarPago() {
        JOptionPane.showMessageDialog(null,"Pago Realizado con Tarjeta de Credito" +
                "\nNumero del Pago: " + numero + "\nTitular: " + super.titular);
    }

    @Override
    public void cancelarPago() {
        JOptionPane.showMessageDialog(null,"Pago Cancelado desde Tarjeta de Credito" +
                "\nNumero de tarjeta:" + numero +  "\nTitular: " + super.titular);
    }

    @Override
    public String toString() {
        return "Metodo: TarjetaCredito" +
                "\n\tTitular = '" + titular + '\'' +
                "\n\tNumero = " + numero +
                "\n\tCodigo de Seguridad = '" + codigoSeguridad + '\'' +
                "\n\tFecha de Expiracion = '" + fechaExpiracion + '\'' ;
    }
}
