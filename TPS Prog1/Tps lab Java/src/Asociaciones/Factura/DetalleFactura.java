package Asociaciones.Factura;

public class DetalleFactura {
    private String codigoArticulo;
    private String nombreArticulo;
    private int cantidad;
    private double precioUnitario;
    private double descuentoItem;
    private double subtotal;

    public DetalleFactura(String codigoArticulo, int cantidad,double precioUnitario,String nombreArticulo) {
        this.codigoArticulo = codigoArticulo;
        this.cantidad = cantidad;
        this.nombreArticulo = nombreArticulo;
        this.precioUnitario = precioUnitario;
        //Si la cantidad es mayor a 5 se aplica un descuento del 10% sobre el precio
        if(this.cantidad > 5){
            this.descuentoItem = (this.precioUnitario * 0.1);
        }
        this.subtotal = (this.precioUnitario * this.cantidad) * 0.90;
    }

    //Metodo toString

    @Override
    public String toString() {
        return String.format("%-10s %-10s %-10d %-16.2f %-10.2f %-10.2f",
                codigoArticulo, nombreArticulo, cantidad, precioUnitario, descuentoItem, subtotal);
    }

    //Metodos Getter y Setter

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getSubtotal() {
        return subtotal;
    }

}
