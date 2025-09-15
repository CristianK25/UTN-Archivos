package org.example.entidades;


import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.util.HashSet;
import java.util.Set;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "sucursales")
@Setter
@SuperBuilder

public class Articulo  {
    protected Long id;
    protected String denominacion;
    protected Double precioVenta;

    @Builder.Default
    protected List<Sucursal> sucursales = new HashSet<>();

    @Builder.Default
    protected Set<ImagenArticulo> imagenes = new HashSet<>();

    @Builder.Default
    private Categoria categoria;

    protected UnidadMedida unidadMedida;



}

