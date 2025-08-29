package Servicios_Fabrica;

import Dominio.Animal;

public class AnimalFactory {
    public Animal crearAnimal(String tipo, String detalle){
        return new Animal() {
            @Override
            public String emitirSonido() {
                return "";
            }

            @Override
            public String getDieta() {
                return "";
            }

            @Override
            public boolean neesitaVacunaAnual() {
                return false;
            }
        };
    }
}
