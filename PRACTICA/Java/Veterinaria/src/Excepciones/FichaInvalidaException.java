package Excepciones;

public class FichaInvalidaException extends RuntimeException {
    public FichaInvalidaException(String message) {
        super(message);
    }
}
