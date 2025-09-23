package org.jcr.entidades;

import java.io.Serializable;
import java.util.Objects;

public class Matricula implements Serializable {
    private final String numero;

    public Matricula(String numero) {
        this.numero = validarMatricula(numero);
    }

    public String getNumero() {
        return numero;
    }

    private String validarMatricula(String numero) {
        Objects.requireNonNull(numero, "El número de matrícula no puede ser nulo");
        if (!numero.matches("MP-\\d{4,6}")) {
            throw new IllegalArgumentException("Formato de matrícula inválido. Debe ser como MP-12345");
        }
        return numero;
    }

    @Override
    public String toString() {
        return "Matricula{" +
                "numero='" + numero + '\'' +
                '}';
    }
}
