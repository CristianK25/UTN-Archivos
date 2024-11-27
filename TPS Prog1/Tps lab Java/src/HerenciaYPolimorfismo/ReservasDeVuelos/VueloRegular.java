package HerenciaYPolimorfismo.ReservasDeVuelos;

public class VueloRegular extends Vuelos implements Promocionable{
    private int numeroAsientos;
    private double precio;

    public VueloRegular(int numeroVuelo, String origen, String destino, String fecha,int numeroAsientos, double precio) {
        super(numeroVuelo, origen, destino, fecha);
        this.numeroAsientos = numeroAsientos;
        this.precio = precio;
    }

    //Metodos heredados de Vuelos
    @Override
    public double calcularPrecio() {
        return aplicarPromocion();
    }
    //Metodos implementados de Promocionable
    @Override
    public double aplicarPromocion() {
        if (this.numeroAsientos >= 50){
            this.precio *= this.numeroAsientos * 0.85;
            return this.precio;
        }
        return this.precio * this.numeroAsientos;
    }

    @Override
    public String toString() {
        return "---Vuelo Regular---" +
                "\nNumeroVuelo = " + numeroVuelo +
                "\nOrigen = '" + origen + '\'' +
                "\nDestino = '" + destino + '\'' +
                "\nFecha = '" + fecha + '\'' +
                "\nNumero de asientos = " + numeroAsientos +
                "\nPrecio por asiento = "+ precio;
    }
}
