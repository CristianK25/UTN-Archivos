package HerenciaYPolimorfismo.SistemasNotificaciones;

public class MensajeTexto extends CanalNotificacion implements Personalizable{
    private String numeroTelefono;

    public MensajeTexto(String usuario, String mensaje,String numeroTelefono) {
        super(usuario, mensaje);
        this.numeroTelefono = numeroTelefono;
    }


    @Override
    public void enviarNotificacion() {

    }
}
