package org.example.entidades;


import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalTime;




@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString(exclude = "empresa")  // Excluir empresa para evitar recursión infinita
@SuperBuilder
public class Sucursal {
    private Long id;
    private String nombre;
    private LocalTime horarioApertura;
    private LocalTime horarioCierre;
    private boolean esCasaMatriz;

    private Domicilio domicilio;

    private Empresa empresa;
/*
    @Override
    public String toString() {
        return "Sucursal{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", horarioApertura=" + horarioApertura +
                ", horarioCierre=" + horarioCierre +
                ", esCasaMatriz=" + esCasaMatriz +
                ", domicilio=" + domicilio +  // Aquí se imprime el domicilio, que ya tiene su propia lógica de toString
                '}';
    }
   */
}
