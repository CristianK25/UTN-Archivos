package HerenciaYPolimorfismo.ReservasDeVuelos;

import java.util.ArrayList;

public class Reservas {
    private ArrayList<Vuelos> vuelos = new ArrayList<>();

    public void agregarVuelos(Vuelos vuelo) {
        vuelos.add(vuelo);
    }

    public int calcularTotalReservas() {
        return vuelos.size();
    }

    public void aplicarPromociones(){
        for (Vuelos vuelo : vuelos) {
            vuelo.calcularPrecio();
        }
    }

    public void mostrarVuelos() {
        System.out.println("----------");
        for (Vuelos vuelo : vuelos) {
            System.out.println(vuelo);
            System.out.println("----------");
        }
    }
}
