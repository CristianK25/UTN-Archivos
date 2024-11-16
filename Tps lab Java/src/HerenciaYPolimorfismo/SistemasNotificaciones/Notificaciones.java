package HerenciaYPolimorfismo.SistemasNotificaciones;

import javax.swing.*;
import java.util.ArrayList;

public class Notificaciones {

    private final ArrayList<CanalNotificacion> canalNotificaciones = new ArrayList<>();
    private boolean encontrado;

    public void agregarCanales(CanalNotificacion canalNotificacion){
        canalNotificaciones.add(canalNotificacion);
    }

    public void enviarNotificacion(String usuario){
        encontrado = false;
        for (CanalNotificacion canal: canalNotificaciones){
            if(canal.getUsuario().equals(usuario)){
                canal.enviarNotificacion();
                encontrado = true;
                break;
            }
        }
        if (!encontrado){
            JOptionPane.showMessageDialog(null,"Ese usuario no existe");
        }
    }

    public void personalizarMensajes(String usuario, String nuevoMensaje){
        encontrado = false;
        for (CanalNotificacion canal: canalNotificaciones){
            if (canal.getUsuario().equals(usuario) && canal instanceof Personalizable){
                ((Personalizable) canal).personalizarMensaje(nuevoMensaje);
                encontrado = true;
                break;
            }
        }
        if (!encontrado){
            JOptionPane.showMessageDialog(null,"Ese usuario no existe");
        }
    }

    public void mostrarCanales(){
        for (CanalNotificacion canal: canalNotificaciones){
            JOptionPane.showMessageDialog(null,canal);
        }
    }
}
