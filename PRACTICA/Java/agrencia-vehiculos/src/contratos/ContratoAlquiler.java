package contratos;

import capacidades.Pagable;
import personas.Cliente;
import vehiculos.Vehiculo;

import java.time.LocalDate;

public class ContratoAlquiler implements Pagable {
    private final Cliente cliente;
    private final Vehiculo vehiculo;
    private final LocalDate fechaInicio;
    private final int dias;
    private final double precioPorDia;
    private boolean pagado = false;

    public double total() { return dias * precioPorDia; }

    public ContratoAlquiler(Cliente cliente, Vehiculo vehiculo,
                            LocalDate fechaInicio, int dias, double precioPorDia) {
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.dias = dias;
        this.precioPorDia = precioPorDia;
    }



    @Override
    public void pagar(double monto) {
        double total = total();
        if (monto >= total) {
            pagado = true;
            double vuelto = monto - total;
            System.out.println("Pago recibido: $" + monto + " (total $" + total + "). Su vuelto es " + vuelto);
        } else {
            System.out.println("Pago insuficiente: $" + monto + " < $" + total);
        }
    }

    @Override
    public String toString() {
        return "ContratoAlquiler{cliente=" + cliente +
                ", vehiculo=" + vehiculo +
                ", fecha=" + fechaInicio +
                ", dias=" + dias +
                ", precio/dia=" + precioPorDia +
                ", total=" + total() +
                ", pagado=" + pagado + "}";
    }
}