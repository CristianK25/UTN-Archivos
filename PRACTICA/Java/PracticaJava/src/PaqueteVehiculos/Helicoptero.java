package PaqueteVehiculos;

public class Helicoptero extends VehiculoAereo {
    private int cantidadHelices;

    public Helicoptero() {
        this.cantidadHelices = 5;
    }

    @Override
    public float VelocMaxima() {
        return 250;
    }

    @Override
    public float alturaVuelo() {
        return 300;
    }

    public void mostrarAtributos(){
        System.out.println("Cantidad de helices: " + cantidadHelices);
        super.mostrarAtributos();
    }

    @Override
    public float capacidad_max_de_carga() {
        return 1500;
    }
}
