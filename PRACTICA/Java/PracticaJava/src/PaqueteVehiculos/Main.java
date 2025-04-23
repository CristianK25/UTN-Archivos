package PaqueteVehiculos;

public class Main {
    public static void main(String[] args) {
        Avion avion = new Avion();
        Moto moto = new Moto();
        Coche coche = new Coche();
        Helicoptero helicoptero = new Helicoptero();

        coche.mostrarAtributos();
        moto.mostrarAtributos();
        helicoptero.mostrarAtributos();
        avion.mostrarAtributos();

        System.out.println(avion.cantCombustible);
        System.out.println(moto.cantRuedas);

        moto.desdePotencia(3,4500);
        coche.capacidad_max_de_carga();

        System.out.println(helicoptero.getClass());
        helicoptero.mostrarAtributos();
        System.out.println(helicoptero.capacidad_max_de_carga());
        System.out.println(helicoptero.VelocMaxima());
    }
}