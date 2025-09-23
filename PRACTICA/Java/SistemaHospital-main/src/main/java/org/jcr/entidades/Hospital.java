package org.jcr.entidades;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Getter
@ToString(exclude = {"departamentos", "pacientes"}) // Excluimos listas para evitar referencias circulares
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@EqualsAndHashCode(exclude = {"departamentos", "pacientes"}) // Solo comparamos por datos básicos
@Builder(toBuilder = true) // Permite crear copias modificables
public class Hospital implements Serializable {
    
    @NonNull String nombre;
    @NonNull String direccion;
    @NonNull String telefono;
    
    @Getter(AccessLevel.NONE) // No generamos getter público para estas listas
    @Builder.Default
    List<Departamento> departamentos = new ArrayList<>();
    
    @Getter(AccessLevel.NONE) // No generamos getter público para estas listas
    @Builder.Default
    List<Paciente> pacientes = new ArrayList<>();
    
    // Constructor personalizado que mantiene las validaciones
    public Hospital(@NonNull String nombre, @NonNull String direccion, @NonNull String telefono) {
        this.nombre = validarString(nombre, "El nombre del hospital no puede ser nulo ni vacío");
        this.direccion = validarString(direccion, "La dirección no puede ser nula ni vacía");
        this.telefono = validarString(telefono, "El teléfono no puede ser nulo ni vacío");
        this.departamentos = new ArrayList<>();
        this.pacientes = new ArrayList<>();
    }
    
    // Constructor interno para Builder (necesario para mantener validaciones)
    @Builder
    private Hospital(@NonNull String nombre, @NonNull String direccion, @NonNull String telefono,
                    List<Departamento> departamentos, List<Paciente> pacientes) {
        this.nombre = validarString(nombre, "El nombre del hospital no puede ser nulo ni vacío");
        this.direccion = validarString(direccion, "La dirección no puede ser nula ni vacía");
        this.telefono = validarString(telefono, "El teléfono no puede ser nulo ni vacío");
        this.departamentos = departamentos != null ? departamentos : new ArrayList<>();
        this.pacientes = pacientes != null ? pacientes : new ArrayList<>();
    }
    
    public void agregarDepartamento(Departamento departamento) {
        if (departamento != null && !departamentos.contains(departamento)) {
            departamentos.add(departamento);
            departamento.setHospital(this);
        }
    }
    
    public void agregarPaciente(Paciente paciente) {
        if (paciente != null && !pacientes.contains(paciente)) {
            pacientes.add(paciente);
            paciente.setHospital(this);
        }
    }
    
    public List<Departamento> getDepartamentos() {
        return Collections.unmodifiableList(departamentos);
    }
    
    public List<Paciente> getPacientes() {
        return Collections.unmodifiableList(pacientes);
    }
    
    // Métodos internos para acceso package-private
    List<Departamento> getInternalDepartamentos() {
        return departamentos;
    }
    
    List<Paciente> getInternalPacientes() {
        return pacientes;
    }
    
    private static String validarString(String valor, String mensajeError) {
        Objects.requireNonNull(valor, mensajeError);
        if (valor.trim().isEmpty()) {
            throw new IllegalArgumentException(mensajeError);
        }
        return valor;
    }
    
    // Clase Builder personalizada para incluir validaciones
    public static class HospitalBuilder {
        public HospitalBuilder nombre(String nombre) {
            this.nombre = validarString(nombre, "El nombre del hospital no puede ser nulo ni vacío");
            return this;
        }
        
        public HospitalBuilder direccion(String direccion) {
            this.direccion = validarString(direccion, "La dirección no puede ser nula ni vacía");
            return this;
        }
        
        public HospitalBuilder telefono(String telefono) {
            this.telefono = validarString(telefono, "El teléfono no puede ser nulo ni vacío");
            return this;
        }
    }
}