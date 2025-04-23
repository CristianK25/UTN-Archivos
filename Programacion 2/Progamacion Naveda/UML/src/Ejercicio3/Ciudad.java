package Ejercicio3;

public class Ciudad {
    private String nombre;
    private Impuesto[] impuestos;
    private double montoRecaudado;
    private double montoGastado;
    private boolean enDeficit;

    public Ciudad(String nombre, Impuesto[] impuestos, double montoRecaudado, double montoGastado) {
        this.nombre = nombre;
        this.impuestos = impuestos;
        this.montoRecaudado = montoRecaudado;
        this.montoGastado = montoGastado;
        if (this.montoRecaudado < this.montoGastado) {
            this.enDeficit = true;
        }
    }
}
