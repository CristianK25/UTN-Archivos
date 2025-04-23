package PaqueteVehiculos;

public class Avion extends VehiculoAereo{
    private boolean comercial;

    public Avion() {
        this.comercial = false;
    }

    @Override
    public float VelocMaxima() {
        return 900;
    }

    @Override
    public final float alturaVuelo() {
        return 1500;
    }

    public void mostrarAtributos(){
        System.out.println("Comercial: " + this.comercial);
        super.mostrarAtributos();
    }

    @Override
    public float capacidad_max_de_carga() {
        return 150000;
    }
}
