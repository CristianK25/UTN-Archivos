package vehiculos;

/**
 * HERENCIA:
 *  - Clase base ABSTRACTA con estado común (patente, modelo) y comportamiento polimórfico (mover()).
 * POLIMORFISMO:
 *  - mover() será diferente en cada subclase (Auto/Moto/Barco).
 */
public abstract class Vehiculo {
    protected final String patente;
    protected final String modelo;

    protected Vehiculo(String patente, String modelo) {
        this.patente = patente;
        this.modelo = modelo;
    }

    /** Método polimórfico: implementado por cada subclase. */
    public abstract void mover();

    public String getPatente() { return patente; }
    public String getModelo() { return modelo; }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{" + patente + ", " + modelo + "}";
    }
}