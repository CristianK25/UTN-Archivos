package org.example;

import org.example.entidades.*;
import org.example.repositorios.InMemoryRepository;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // Inicializar repositorios
        InMemoryRepository<Empresa> empresaRepository = new InMemoryRepository<>();
        System.out.println(" -----------PROBAMOS EL SISTEMA ----------");
        Pais argentina = Pais.builder().nombre("Argentina").
                build();

        // Crear provincias y localidades
        Provincia buenosAires = Provincia.builder()
                .id(1L)
                .nombre("Buenos Aires")
                .pais(argentina)
                .build();

        Localidad caba = Localidad.builder()
                .id(1L)
                .nombre("CABA")
                .provincia(buenosAires)
                .build();

        Domicilio domicilio1 = Domicilio.builder()
                .id(1L)
                .calle("Calle 1")
                .numero(100)
                .cp(1000)
                .piso(1)
                .nroDpto(1)
                .localidad(caba)
                .build();

        Localidad laPlata = Localidad.builder()
                .id(2L)
                .nombre("La Plata")
                .provincia(buenosAires)
                .build();

        Domicilio domicilio2 = Domicilio.builder()
                .id(2L)
                .calle("Calle 2")
                .numero(200)
                .cp(2000)
                .piso(2)
                .nroDpto(2)
                .localidad(laPlata)
                .build();


        Provincia cordoba = Provincia.builder()
                .id(2L)
                .nombre("Córdoba")
                .pais(argentina)
                .build();

        Localidad cordobaCapital = Localidad.builder()
                .id(3L)
                .nombre("Córdoba Capital")
                .provincia(cordoba)
                .build();

        Domicilio domicilio3 = Domicilio.builder()
                .id(3L)
                .calle("Calle 3")
                .numero(300)
                .cp(3000)
                .piso(3)
                .nroDpto(3)
                .localidad(cordobaCapital)
                .build();



        Localidad villaCarlosPaz = Localidad.builder()
                .id(4L)
                .nombre("Villa Carlos Paz")
                .provincia(cordoba)
                .build();


        Domicilio domicilio4 = Domicilio.builder()
                .id(4L)
                .calle("Calle 4")
                .numero(400)
                .cp(4000)
                .piso(4)
                .nroDpto(4)
                .localidad(villaCarlosPaz)
                .build();

        // Crear sucursales Para buenos Aires
        Sucursal sucursal1 = Sucursal.builder()
                .id(1L)
                .nombre("Sucursal 1")
                .horarioApertura(LocalTime.of(9, 0))
                .horarioCierre(LocalTime.of(18, 0))
                .esCasaMatriz(true)
                .domicilio(domicilio1)
                .build();

        Sucursal sucursal2 = Sucursal.builder()
                .id(2L)
                .nombre("Sucursal 2")
                .horarioApertura(LocalTime.of(9, 0))
                .horarioCierre(LocalTime.of(18, 0))
                .esCasaMatriz(false)
                .domicilio(domicilio2)
                .build();

        // Crear Sucursales Para Cordoba

        Sucursal sucursal3 = Sucursal.builder()
                .id(3L)
                .nombre("Sucursal 3")
                .horarioApertura(LocalTime.of(9, 0))
                .horarioCierre(LocalTime.of(18, 0))
                .esCasaMatriz(true)
                .domicilio(domicilio3)
                .build();

        Sucursal sucursal4 = Sucursal.builder()
                .id(4L)
                .nombre("Sucursal 4")
                .horarioApertura(LocalTime.of(9, 0))
                .horarioCierre(LocalTime.of(18, 0))
                .esCasaMatriz(false)
                .domicilio(domicilio4)
                .build();

        // Crear empresas y asociar sucursales
        Empresa empresa1 = Empresa.builder()
                .nombre("Empresa 1")
                .razonSocial("Razon Social 1")
                .cuil(12345678901L)
                .sucursales(new HashSet<>(Set.of(sucursal1, sucursal2)))
                .build();

        Empresa empresa2 = Empresa.builder()
                .nombre("Empresa 2")
                .razonSocial("Razon Social 2")
                .cuil(22225678901L)
                .sucursales(new HashSet<>(Set.of(sucursal3, sucursal4)))
                .build();

        // Asignar empresa a sucursales
        sucursal1.setEmpresa(empresa1);
        sucursal2.setEmpresa(empresa1);
        sucursal3.setEmpresa(empresa2);
        sucursal4.setEmpresa(empresa2);

        // Guardar empresas en el repositorio
        empresaRepository.save(empresa1);
        empresaRepository.save(empresa2);

        // Mostrar todas las empresas
        System.out.println("Todas las empresas:");
        List<Empresa> todasLasEmpresas = empresaRepository.findAll();
        todasLasEmpresas.forEach(System.out::println);

        // Buscar empresa por ID
        Optional<Empresa> empresaEncontrada = empresaRepository.findById(1L);
        empresaEncontrada.ifPresent(e -> System.out.println("Empresa encontrada por ID 1: " + e));

        // Buscar empresa por nombre
        List<Empresa> empresasPorNombre = empresaRepository.genericFindByField("nombre", "Empresa 1");
        System.out.println("Empresas con nombre 'Empresa 1':");
        empresasPorNombre.forEach(System.out::println);

        // Actualizar empresa por ID
        Empresa empresaActualizada = Empresa.builder()
                .id(1L)
                .nombre("Empresa 1 Actualizada")
                .razonSocial("Razon Social 1 Actualizada")
                .cuil(12345678901L)
                .sucursales(empresa1.getSucursales())
                .build();

        empresaRepository.genericUpdate(1L, empresaActualizada);
        Optional<Empresa> empresaVerificada = empresaRepository.findById(1L);
        empresaVerificada.ifPresent(e -> System.out.println("Empresa después de la actualización: " + e));

        // Eliminar empresa por ID
        empresaRepository.genericDelete(1L);
        Optional<Empresa> empresaEliminada = empresaRepository.findById(1L);
        if (empresaEliminada.isEmpty()) {
            System.out.println("La empresa con ID 1 ha sido eliminada.");
        }

        // Mostrar todas las empresas restantes
        System.out.println("Todas las empresas después de la eliminación:");
        List<Empresa> empresasRestantes = empresaRepository.findAll();
        empresasRestantes.forEach(System.out::println);
        System.out.println("--------------Mostrar las sucursales de una empresa determinada");
// Mostrar las sucursales de una empresa deerminada
        Optional<Empresa> empresa = empresaRepository.findById(2L);
        if (empresa.isPresent()) {
            System.out.println("Sucursales de la empresa con ID "  + ":");
            Set<Sucursal> sucursales = empresa.get().getSucursales();
            sucursales.forEach(System.out::println);
        } else {
            System.out.println("Empresa con ID " + " no encontrada.");
        }



    }
