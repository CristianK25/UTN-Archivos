package HerenciaYPolimorfismo.SistemasNotificaciones;

public class CorreoElectronico extends CanalNotificacion implements Personalizable{
    private String direccionCorreo;

    public CorreoElectronico(String usuario, String mensaje,String direccionCorreo) {
        super(usuario, mensaje);
        this.direccionCorreo = direccionCorreo;
    }


    @Override
    public void enviarNotificacion() {

    }
}
