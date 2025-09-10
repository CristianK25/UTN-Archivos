package capacidades;

/** Contrato (interfaz) para entidades que pueden recibir pagos. */
public interface Pagable {
    void pagar(double monto);
}