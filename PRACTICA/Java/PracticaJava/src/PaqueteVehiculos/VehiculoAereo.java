package PaqueteVehiculos;

public abstract class VehiculoAereo extends Vehiculo {
    public float alturaVuelo;

    public abstract float alturaVuelo();

    public void mostrarAtributos(){
        System.out.println("Altura: " + alturaVuelo);
        super.mostrarAtributos();
    }
}
