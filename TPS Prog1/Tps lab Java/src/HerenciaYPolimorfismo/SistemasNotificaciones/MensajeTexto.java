package HerenciaYPolimorfismo.SistemasNotificaciones;

import javax.swing.*;

public class MensajeTexto extends CanalNotificacion implements Personalizable{
    private final String numeroTelefono;

    public MensajeTexto(String usuario, String mensaje,String numeroTelefono) {
        super(usuario, mensaje);
        this.numeroTelefono = numeroTelefono;
    }


    @Override
    public void enviarNotificacion() {
        JOptionPane.showMessageDialog(null,"Se ha enviado: '" + super.mensaje + "' a travez de :" +
                "\nMensaje de Texto \n Numero telefonico: " + numeroTelefono,"Usuario: "+ usuario,
                JOptionPane.PLAIN_MESSAGE);
    }

    @Override
    public void personalizarMensaje(String nuevoMensaje) {
        String cambio = "Mensaje anterior: ' "+mensaje +"\nNuevo Mensaje: '"+nuevoMensaje+"' ";
        JOptionPane.showMessageDialog(null,cambio);
        this.mensaje = nuevoMensaje;
    }

    @Override
    public String toString() {
        return "MensajeTexto" +
                "\nUsuario = '" + usuario + '\'' +
                "\nMensaje = '" + mensaje + '\'' +
                "\nNumeroTelefono = '" + numeroTelefono + '\'';
    }
}
