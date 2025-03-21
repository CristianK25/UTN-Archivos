package HerenciaYPolimorfismo.SistemasNotificaciones;

public abstract class CanalNotificacion {

    protected String usuario;
    protected String mensaje;

    public CanalNotificacion(String usuario, String mensaje) {
        this.usuario = usuario;
        this.mensaje = mensaje;
    }

    public String getUsuario() {
        return usuario;
    }

    public abstract void enviarNotificacion();

}
