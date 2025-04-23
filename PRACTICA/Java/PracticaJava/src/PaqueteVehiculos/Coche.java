package PaqueteVehiculos;

public class Coche extends VehiculoTerrestre{
    private String marca;

    public Coche() {
        this.marca = "Audi";
    }

    @Override
    public float VelocMaxima() {
        return 100;
    }
    public void mostrarAtributos(){
        System.out.println("Marca: " + marca);
        super.mostrarAtributos();
    }

    @Override
    public float capacidad_max_de_carga() {
        return 800;
    }
}
