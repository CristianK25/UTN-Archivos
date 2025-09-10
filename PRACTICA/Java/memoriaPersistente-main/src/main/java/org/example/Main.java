package org.example;

import org.example.entidades.Empresa;
import org.example.repositorio.InMemoryRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hola Alberto");
        InMemoryRepository<Empresa> empresaRepository = new InMemoryRepository<>();



        // Crear una nueva empresa y guardarla
        Empresa empresa1 = Empresa.builder()
                .nombre("Mi Empresa")
                .razonSocial("Mi Razon Social")
                .cuil(12345678901L)
                .build();

        empresaRepository.save(empresa1);

        // Crear otra empresa y guardarla
        Empresa empresa2 = Empresa.builder()
                .nombre("Otra Empresa")
                .razonSocial("Ptra Razon Social")
                .cuil(22225678901L)
                .build();


        empresaRepository.save(empresa2);

        System.out.println("----------------MUESTRO AHORA TODAS LAS EMPRESAS");
        System.out.println("Todas las empresas:");
        List<Empresa> todasLasEmpresas = empresaRepository.findAll();
        todasLasEmpresas.forEach(System.out::println);


        System.out.println("----------------Busco por ID = 1");
        // Buscar por ID
        Optional<Empresa> encontradaPorId = empresaRepository.findById(1L);
        encontradaPorId.ifPresent(System.out::println);

        System.out.println("----------------Busco por un campo del registro ");

        // Buscar por nombre de empresa
        List<Empresa> empresasConNombre = empresaRepository.genericFindByField("nombre", "Mi Empresa");
        empresasConNombre.forEach(System.out::println);

        System.out.println("----------------Actualizo en registro por ID");
        // Actualizar empresa por ID
        Empresa empresaActualizada = Empresa.builder()
                .nombre("Mi Empresa")
                .razonSocial("CAMBIE Razon Social")
                .cuil(12345678901L)
                .build();



        Optional<Empresa> empresaActualizadaOptional = empresaRepository.genericUpdate(1L, empresaActualizada);
        empresaActualizadaOptional.ifPresent(e -> System.out.println("Actualizada: " + e));

        // Verificar actualización
        Optional<Empresa> verificarActualizacion = empresaRepository.findById(1L);
        verificarActualizacion.ifPresent(e -> System.out.println("Después de la actualización: " + e));

        System.out.println("----------------MUESTRO AHORA TODAS LAS EMPRESAS");
        System.out.println("Todas las empresas:");
        List<Empresa> todasLasEmpresasac = empresaRepository.findAll();
        todasLasEmpresasac.forEach(System.out::println);



        // Eliminar empresa por ID
        Optional<Empresa> empresaEliminada = empresaRepository.genericDelete(1L);
        empresaEliminada.ifPresent(e -> System.out.println("Eliminada: " + e));



        // Verificar eliminación
        Optional<Empresa> verificarEliminacion = empresaRepository.findById(1L);
        if (verificarEliminacion.isEmpty()) {
            System.out.println("La empresa con ID 1 ha sido eliminada.");
        } else {
            System.out.println("La empresa con ID 1 todavía existe.");
        }

        System.out.println("----------------MUESTRO AHORA TODAS LAS EMPRESAS");
        System.out.println("Todas las empresas:");
        List<Empresa> todasLasEmpresaseli = empresaRepository.findAll();
        todasLasEmpresaseli.forEach(System.out::println);
    }
}
