package HerenciaYPolimorfismo.ReservasDeVuelos;

public class VueloCharter extends Vuelos implements Promocionable{
    private int precioTotal;

    public VueloCharter(int numeroVuelo, String origen, String destino, String fecha,int precio) {
        super(numeroVuelo, origen, destino, fecha);
        this.precioTotal = precio;
    }


    //Metodos heredados de Vuelos
    @Override
    public double calcularPrecio() {
        return aplicarPromocion();
    }
    //Metodos implementados de Promocionable
    @Override
    public double aplicarPromocion() {
        return precioTotal * 0.90;
    }

    @Override
    public String toString() {
        return "--VueloCharter--" +
                "\nNumeroVuelo = " + numeroVuelo +
                "\nOrigen = '" + origen + '\'' +
                "\nDestino = '" + destino + '\'' +
                "\nFecha = '" + fecha + '\'' +
                "\nPrecio = " + precioTotal;
    }
}
