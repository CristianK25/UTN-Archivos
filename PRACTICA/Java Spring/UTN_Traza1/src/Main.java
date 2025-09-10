import entidades.*;
import repositorio.InMemoryRepository;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        InMemoryRepository<Empresa> empresaRepository = new InMemoryRepository<>();

        Pais argentina = Pais.builder()
                .nombre("Argentina")
                .build();

        Provincia buenosaires = Provincia.builder()
                .id(1L)
                .nombre("Buenos Aires")
                .pais(argentina)
                .build();

        Localidad caba = Localidad.builder()
                .id(1L)
                .nombre("CABA")
                .provincia(buenosaires)
                .build();

        Domicilio domicilio1 = Domicilio.builder()
                .id(1L)
                .cp(1234)
                .numero(15)
                .calle("Calle Caba")
                .localidad(caba)
                .build();

        Localidad laplata = Localidad.builder()
                .id(1L)
                .nombre("La plata")
                .provincia(buenosaires)
                .build();

        Domicilio domicilio2 = Domicilio.builder()
                .id(1L)
                .cp(1234)
                .numero(15)
                .calle("Calle La plata")
                .build();

        Provincia cordoba = Provincia.builder()
                .id(1L)
                .nombre("Cordoba")
                .pais(argentina)
                .build();

        Localidad cordobaCapital = Localidad.builder()
                .id(1L)
                .nombre("Cordoba Capital")
                .provincia(cordoba)
                .build();

        Domicilio domicilio3 = Domicilio.builder()
                .id(1L)
                .calle("Calle cordoba")
                .numero(34)
                .localidad(cordobaCapital)
                .build();

        Localidad villaCarlosPaz = Localidad.builder()
                .id(1L)
                .nombre("Villa Carlos Paz")
                .provincia(cordoba)
                .build();

        Domicilio domicilio4 = Domicilio.builder()
                .id(1L)
                .calle("Calle villa Carlos Paz")
                .localidad(villaCarlosPaz)
                .build();



        Sucursal sucursal1 = Sucursal.builder()
                .nombre("Sucursal 1")
                .es_Casa_Matriz(true)
                .domicilio(domicilio1)
                .horarioApertura(LocalTime.now())
                .horarioCierre(LocalTime.now())
                .build();

        Sucursal sucursal2 = Sucursal.builder()
                .nombre("Sucursal 2")
                .es_Casa_Matriz(true)
                .domicilio(domicilio2)
                .horarioApertura(LocalTime.now())
                .horarioCierre(LocalTime.now())
                .build();

        Sucursal sucursal3 = Sucursal.builder()
                .nombre("Sucursal 4")
                .es_Casa_Matriz(true)
                .domicilio(domicilio3)
                .horarioApertura(LocalTime.now())
                .horarioCierre(LocalTime.now())
                .build();

        Sucursal sucursal4 = Sucursal.builder()
                .nombre("Sucursal 4")
                .es_Casa_Matriz(true)
                .domicilio(domicilio4)
                .horarioApertura(LocalTime.now())
                .horarioCierre(LocalTime.now())
                .build();



        Empresa empresa = Empresa.builder()
                .nombre("Ultra Tecnologia")
                .cuit(123456778)
                .logo("Logo de la empresa")
                .razonSocial("Osep")
                .sucursales(new HashSet<>(Set.of(sucursal1,sucursal2)))
                .build();

        Empresa empresa2 = Empresa.builder()
                .nombre("Empresa 2")
                .cuit(223543)
                .logo("Logo de la empresa")
                .razonSocial("Osde")
                .sucursales(new HashSet<>(Set.of(sucursal3, sucursal4)))
                .build();


        sucursal1.setEmpresa(empresa);
        sucursal2.setEmpresa(empresa);
        sucursal3.setEmpresa(empresa2);
        sucursal4.setEmpresa(empresa2);

        empresaRepository.save(empresa);
        empresaRepository.save(empresa2);

        //Mostrar todas las empresas
        System.out.println("Todas las empresas");
        empresaRepository.findAll().forEach(System.out::println);

        //Buscar empresa por su Id
        empresaRepository.findById(1L).ifPresent(System.out::println);

        //Actualizar los datos de una empresa buscando por su ID. Por ejemplo modificar su cuil.
        Empresa empresaActualizada = Empresa.builder()
                .id(empresa.getId())
                .nombre("Ultra Tecnologia")
                .cuit(20203535)
                .logo("Logo de la empresa")
                .razonSocial("Osep")
                .sucursales(new HashSet<>(Set.of(sucursal1,sucursal2)))
                .build();
        empresaRepository.genericUpdate(empresa.getId(), empresaActualizada);


        empresaRepository.genericDelete(empresa.getId());
    }
}
