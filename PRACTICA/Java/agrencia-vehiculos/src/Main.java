import agencia.Agencia;
import capacidades.Asegurable;
import capacidades.Conducible;
import capacidades.Navegable;
import capacidades.Pagable;
import contratos.ContratoAlquiler;
import personas.Cliente;
import vehiculos.Auto;
import vehiculos.Barco;
import vehiculos.Moto;
import vehiculos.Vehiculo;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        Agencia agencia = new Agencia("RentaYa");
        Vehiculo a1 = new Auto("AB123CD", "Sedán LX", 4, "Nafta");
        Vehiculo m1 = new Moto("AC987ZT", "Street 200", 200);
        Vehiculo b1 = new Barco("NAU-777", "Lancha 5m", true, 5.2);

        agencia.agregarVehiculo(a1);
        agencia.agregarVehiculo(m1);
        agencia.agregarVehiculo(b1);

        System.out.println(agencia);
        agencia.getFlota().forEach(System.out::println);

        System.out.println("== Polimorfismo ==");
        agencia.getFlota().forEach(Vehiculo::mover);

        System.out.println("== Interfaces ==");
        agencia.getFlota().forEach(v -> {
            if (v instanceof Conducible c) c.conducir();
            if (v instanceof Navegable n)  n.navegar();
            if (v instanceof Asegurable s) s.asegurar();
        });


        System.out.println("== Downcasting (acceso a métodos/atributos propios) ==");
        for (Vehiculo v : agencia.getFlota()) {
            if (v instanceof Auto auto) {
                System.out.println("Es un Auto: " + auto.getModelo() +
                        " (" + auto.getCantidadPuertas() + " puertas, " +
                        auto.getTipoCombustible() + ")");
            } else if (v instanceof Moto moto) {
                System.out.println("Es una Moto: " + moto.getModelo() +
                        " (" + moto.getCilindrada() + " cc)");
            } else if (v instanceof Barco barco) {
                System.out.println("Es un Barco: " + barco.getModelo() +
                        " (" + barco.getEslora() + "m, deportiva=" + barco.isEsDeportiva() + ")");
            }
        }


        Cliente cli = new Cliente("Ana", "30111222");
        ContratoAlquiler contrato = new ContratoAlquiler(cli, a1, LocalDate.now(), 3, 45000);
        System.out.println(contrato);

        contrato.pagar(100000); // insuficiente
        contrato.pagar(200000); // suficiente
        System.out.println(contrato);
    }
}