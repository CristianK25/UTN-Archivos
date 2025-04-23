package PaqueteVehiculos;

public abstract class Vehiculo extends Moto implements Potencia{

    public char tipoCombustible;
    public float cantCombustible;

    public abstract float VelocMaxima();

    public void mostrarAtributos(){
        System.out.println("Tipo de Combustible: " + tipoCombustible);
        System.out.println("CantCombustible: " + cantCombustible);
    }

    public void desdePotencia(int posicion,int cantidadCombustibleRequerida){
        if (0 <= posicion && posicion <= tipo_combustible.length)
            System.out.println("Tipo de combustible"+ tipo_combustible[posicion] +
                    "\n Combustible Requerido: "+ cantidadCombustibleRequerida);
        else System.out.println("Posicion fuera de rango");
    }
}
