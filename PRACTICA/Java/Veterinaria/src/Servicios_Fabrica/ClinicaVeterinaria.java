package Servicios_Fabrica;

import Dominio.Animal;
import Dominio.ContenedorGenerico;
import Dominio.Veterinario;

import java.util.List;

public class ClinicaVeterinaria {
    private ContenedorGenerico<Veterinario> staff;
    private ContenedorGenerico<Animal> pacientes;

    public void agregarVeterinario(Veterinario v){
        staff.agregarElemento(v);
    }

    public void registrarPaciente(Animal a){}
}
