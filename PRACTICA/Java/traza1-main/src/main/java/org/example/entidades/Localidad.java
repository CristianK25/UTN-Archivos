package org.example.entidades;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;



@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public class Localidad {
    private Long id;
    private String nombre;
    private Provincia provincia;

    @Override
    public String toString() {
        return "Localidad{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", provincia=" + (provincia != null ? provincia.getNombre() : null) + // Evitar recursión infinita
                '}';
    }
}