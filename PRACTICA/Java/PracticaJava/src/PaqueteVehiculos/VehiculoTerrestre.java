package PaqueteVehiculos;

import java.util.PrimitiveIterator;
import java.util.Set;

public abstract class VehiculoTerrestre extends Vehiculo {
    public int cantRuedas;

    public void mostrarAtributos(){
        System.out.println("Cantidad de ruedas: " + cantRuedas);
        super.mostrarAtributos();
    }

}
