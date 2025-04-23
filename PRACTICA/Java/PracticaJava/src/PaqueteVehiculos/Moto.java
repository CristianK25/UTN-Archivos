package PaqueteVehiculos;

public class Moto {
    private boolean acuatica;

    public Moto() {
        this.acuatica = true;
    }


    public float VelocMaxima() {
        return 50;
    }

    public void mostrarAtributos(){
        System.out.println("Es acuatica?: " + acuatica);
        super.mostrarAtributos();
    }


    public float capacidad_max_de_carga() {
        return 200;
    }
}
