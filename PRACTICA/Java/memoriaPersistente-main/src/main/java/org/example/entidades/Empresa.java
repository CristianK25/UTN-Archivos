package org.example.entidades;

import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@SuperBuilder
public class Empresa {
    private Long id;
    private String nombre;
    private String razonSocial;
    private Long cuil;



}
