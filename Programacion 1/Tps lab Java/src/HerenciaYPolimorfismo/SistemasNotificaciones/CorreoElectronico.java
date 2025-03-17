package HerenciaYPolimorfismo.SistemasNotificaciones;

import javax.swing.*;

public class CorreoElectronico extends CanalNotificacion implements Personalizable{
    private final String direccionCorreo;


    public CorreoElectronico(String usuario, String mensaje,String direccionCorreo) {
        super(usuario, mensaje);
        this.direccionCorreo = direccionCorreo;
    }


    @Override
    public void enviarNotificacion() {
        JOptionPane.showMessageDialog(null,"Se ha enviado\n'" + super.mensaje + "' a travez de: " +
                "\nCorreo electronico :"+ direccionCorreo,"Usuario: "+ usuario,JOptionPane.PLAIN_MESSAGE);
    }

    @Override
    public void personalizarMensaje(String nuevoMensaje) {
        String cambio = "Mensaje anterior: ' "+mensaje +"\nNuevo Mensaje: '"+nuevoMensaje+"' ";
        JOptionPane.showMessageDialog(null,cambio);
        this.mensaje = nuevoMensaje;
    }

    @Override
    public String toString() {
        return "CorreoElectronico" +
                "\nUsuario = '" + usuario + '\'' +
                "\nMensaje = '" + mensaje + '\'' +
                "\nDireccionCorreo = '" + direccionCorreo + '\'';
    }
}
