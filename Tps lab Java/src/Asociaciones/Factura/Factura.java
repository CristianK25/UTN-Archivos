package Asociaciones.Factura;

import java.util.ArrayList;

public class Factura {
    private String fechaFactura;
    private long numeroFactura;
    private double totalCalculadoFactura;
    private String cliente;
    private ArrayList<DetalleFactura> detallesFactura;

    public Factura(String fechaFactura, long numeroFactura,String cliente) {
        this.fechaFactura = fechaFactura;
        this.numeroFactura = numeroFactura;
        this.cliente = cliente;
        this.detallesFactura = new ArrayList<>();
    }

    public void agregarDetalleFactura(DetalleFactura detalleFactura) {
        this.detallesFactura.add(detalleFactura);
    }

    public String getFechaFactura() {
        return fechaFactura;
    }

    public long getNumeroFactura() {
        return numeroFactura;
    }

    public String getCliente() {
        return cliente;
    }

    public void mostrarDetalleFactura() {
        for (DetalleFactura detalleFactura : detallesFactura) {
            System.out.println(detalleFactura);
        }
        System.out.println("Total: " + calcularTotalFactura());
    }

    public double calcularTotalFactura() {
        totalCalculadoFactura = 0;
        for (DetalleFactura detalleFactura : detallesFactura) {
            totalCalculadoFactura += detalleFactura.getSubtotal();
        }
        return totalCalculadoFactura;
    }
}
