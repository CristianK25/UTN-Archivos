package Asociaciones.Factura;

import javax.swing.*;


public class Facturacion {
    private static final String[][] articulos = {
            {"101","Leche","25.0"},
            {"102","Gaseosa","30.0"},
            {"103","Fideos","15.0"},
            {"104","Arroz","28.0"},
            {"105","Vino","120.0"},
            {"106","Manteca","20.0"},
            {"107","Lavandina","18.0"},
            {"108","Detergente","46.0"},
            {"109","Jabon en Polvo","96.0"},
            {"110","Galletas","60.0"},
    };

    public static void main(String[] args) {
        //Pedir datos para la factura
        String fechaFactura = JOptionPane.showInputDialog(null,"Ingrese la Fecha de factura",
                "Factura",JOptionPane.INFORMATION_MESSAGE);
        long numeroFactura = numeroEnteroPositivo("Numero de Factura");
        String cliente = validarNombre();
        //Instanciar el objeto factura
        Factura factura = new Factura(fechaFactura,numeroFactura,cliente);

        //Llamo al metodo para llenar el arraylist de factura
        llenarArrayListDeArticulos(factura);

        //Mostrar la factura
        menuDeArticulosparaFactura(factura);
    }

    public static void llenarArrayListDeArticulos(Factura factura) {
        int continuar;
        do{
            long codigo = numeroEnteroPositivo("Ingrese el codigo de articulo");
            if (validarCodigo(codigo)){
                int cantidad = Integer.parseInt(JOptionPane.showInputDialog(null,"Ingrese cantidad de articulos"));
                DetalleFactura detalleFactura = new DetalleFactura(String.valueOf(codigo),cantidad,devolverPrecio(codigo),devolverNombre(codigo));
                factura.agregarDetalleFactura(detalleFactura);
            }else{
                JOptionPane.showMessageDialog(null,"El codigo de articulo no es valido","Error",JOptionPane.ERROR_MESSAGE);
            }
            continuar = JOptionPane.showConfirmDialog(null,"¿Seguir ingresando articulos?",
                    "Detalles Factura",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
        }while(continuar == 0);
    }

    public static void menuDeArticulosparaFactura(Factura factura){
        System.out.println("Factura:");
        //Informacion de la factura
        System.out.printf("Fecha: %s\nNumero: %d\nCliente: %s\n", factura.getFechaFactura(),factura.getNumeroFactura(),factura.getCliente());
        //Cabecera de los detalles de la factura
        System.out.printf("%-10s %-10s %-10s %-16s %-10s %-10s\n","Codigo","Nombre","Cantidad","Precio Unitario","Descuento","Subtotal");
        System.out.println("-----------------------------------------------------------");
        factura.mostrarDetalleFactura();
    }

    //Metodos Extra
    public static long numeroEnteroPositivo(String solicitud){
        boolean valido = false;
        long numeroFactura = 0;
        do{
            try{
                numeroFactura = Long.parseLong(JOptionPane.showInputDialog(null,
                        solicitud,"Codigo",JOptionPane.QUESTION_MESSAGE));
                if(numeroFactura > 0){
                    valido = true;
                }
            }catch(NumberFormatException e) {
                JOptionPane.showMessageDialog(null, "ERROR INGRESANDO EL NUMERO", "Numero", JOptionPane.ERROR_MESSAGE);
            }
        }while(!valido);
        return numeroFactura;
    }

    public static String validarNombre(){
        boolean valido = false;
        String nombre;
        do{
            nombre = JOptionPane.showInputDialog(null,"Ingrese el cliente","Cliente",JOptionPane.QUESTION_MESSAGE);
            if (nombre.isEmpty() || nombre.matches(".*\\d.*")){
                JOptionPane.showMessageDialog(null,"ERROR INGRESANDO EL CLIENTE", "Cliente", JOptionPane.ERROR_MESSAGE);
            }else{
                valido = true;
            }
        }while(!valido);
        return nombre;
    }

    public static boolean validarCodigo(long codigo){
        boolean valido = false;
        String codigoString = String.valueOf(codigo);
        for (String[] articulo : articulos) {
            if (articulo[0].equals(codigoString)) {
                valido = true;
                break;
            }
        }
        return valido;
    }

    public static double devolverPrecio(long codigo){
        String precioString = String.valueOf(codigo);
        String codigoString = String.valueOf(codigo);
        for (String[] articulo : articulos) {
            if (articulo[0].equals(codigoString)) {
                precioString = articulo[2];

            }
        }
        return Double.parseDouble(precioString);
    }

    public static String devolverNombre(long codigo){
        String nombre = "";
        String codigoString = String.valueOf(codigo);
        for (String[] articulo : articulos) {
            if (articulo[0].equals(codigoString)) {
                nombre = articulo[1];
            }
        }
        return nombre;
    }

}