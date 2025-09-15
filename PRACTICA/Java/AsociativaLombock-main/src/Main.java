

public class Main {

    public static void main(String[] args) {
        RegistroPropiedad registro1 = RegistroPropiedad.builder()
                .idRegistro(1)
                .nombreRegistro("Mendoza Capital")
                .build();

        // Crear un Lote
        Lote lote1 = Lote.builder()
                .idPadron(123)
                .domicilio("suipacha 239")
                .superficie(100.0).build();

        registro1.registrarLote(lote1,"08/08/2025");
        // Registrar el lote en el registro

        // Crear un Edificio
        Edificio edificio1 = Edificio.builder()
                .idEdificio(1)
                .nombre("Presidente")
                .superficieConstruida(50.0)
                .build();

        // Construyp edificio en el lote
        registro1.construirEdificio(lote1, edificio1);

        // Creo Lote
        Lote lote2 = Lote.builder()
                .idPadron(222)
                .domicilio("Rodriguez")
                .superficie(400.0).build();

        registro1.registrarLote(lote2,"18/08/2025");


// Intento construir otro edificio
        Edificio edificio2 = new Edificio(2, "Otro Edificio", 60.0);
        registro1.construirEdificio(lote2, edificio2);

        registro1.getEscrituras();


    }
}