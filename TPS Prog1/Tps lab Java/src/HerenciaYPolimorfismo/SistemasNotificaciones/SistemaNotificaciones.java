package HerenciaYPolimorfismo.SistemasNotificaciones;

import javax.swing.*;

public class SistemaNotificaciones {
    private static final Notificaciones notificaciones = new Notificaciones();
    private static int opcion;

    public static void main(String[] args) {
        agregarCanales();
        elegirOperacion();
    }

    public static void agregarCanales(){
        String[] opciones = {"Correo Electronico","Mensaje de Texto"};
        do{
            int tipoCanal = JOptionPane.showOptionDialog(null,"Eliga un tipo de canal","ELECCION CANAL",
                    JOptionPane.DEFAULT_OPTION,JOptionPane.PLAIN_MESSAGE,null,opciones,opciones[0]);
            String usuario = JOptionPane.showInputDialog("Ingresa el usuario");
            String mensaje = JOptionPane.showInputDialog("Ingrese el mensaje a enviar");
            switch (tipoCanal){
                case 0:
                    String correo = JOptionPane.showInputDialog("Ingresa el correo electronico de "+ usuario);
                    CorreoElectronico correoElectronico = new CorreoElectronico(usuario,mensaje,correo);
                    notificaciones.agregarCanales(correoElectronico);break;
                case 1:
                    String numeroTel = JOptionPane.showInputDialog("Ingrese el numero telefonico de "+ usuario);
                    MensajeTexto mensajeTexto = new MensajeTexto(usuario,mensaje,numeroTel);
                    notificaciones.agregarCanales(mensajeTexto);break;
            }
            opcion = JOptionPane.showConfirmDialog(null, "¿Dese ingresar otro Canal de notificacion?",
                    "Pregunta",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
        }while(opcion == 0);
    }

    public static void elegirOperacion(){
        String[] opciones = {"Enviar Notificacion","Personalizar Mensajes","Mostrar Canales","Salir"};
        do{
            opcion =  JOptionPane.showOptionDialog(null,"Eliga una opcion","Notificacion",
                    JOptionPane.DEFAULT_OPTION,JOptionPane.PLAIN_MESSAGE,null,opciones,opciones[0]);
            if (opcion != 2 && opcion != 3){
                String usuario = JOptionPane.showInputDialog("Ingresa el nombre del usuario");
                switch (opcion){
                    case 0:
                        notificaciones.enviarNotificacion(usuario); break;
                    case 1:
                        String nuevoMensaje = JOptionPane.showInputDialog("Ingrese el nuevo mensaje");
                        notificaciones.personalizarMensajes(usuario,nuevoMensaje); break;
                }
            } else if (opcion == 2) {
                notificaciones.mostrarCanales();
            }
        }while(opcion != 3);
    }
}
