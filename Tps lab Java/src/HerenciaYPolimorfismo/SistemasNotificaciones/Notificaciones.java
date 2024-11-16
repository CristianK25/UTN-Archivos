package HerenciaYPolimorfismo.SistemasNotificaciones;

import java.util.ArrayList;

public class Notificaciones {

    private ArrayList<CanalNotificacion> canalNotificaciones = new ArrayList<>();

    public void agregarCanales(CanalNotificacion canalNotificacion){
        canalNotificaciones.add(canalNotificacion);
    }

    public void enviarNotificacion(){

    }

    public void personalizarMensajes(){

    }

    public void mostrarCanales(){
        for (CanalNotificacion canal: canalNotificaciones){
            System.out.println(canal);
        }
    }
}
