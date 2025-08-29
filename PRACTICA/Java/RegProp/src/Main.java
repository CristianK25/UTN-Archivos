public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");

        RegistroPropiedad registro1 = RegistroPropiedad.builder()
                .nombreRegistro("Mendoza Capital")
                .idRegistro(1)
                .build();

        Lote lote1 = Lote.builder()
                .idPadron(123)
                .domicilio("Suipacha 256")
                .superficie(35)
                .build();

        registro1.registrarLote(lote1, "2052-52-32");

        Lote lote2 = Lote.builder()
                .idPadron(1233)
                .domicilio("Suipacha 242")
                .superficie(40)
                .build();

        Edificio edificio1 = new Edificio(1, "Edificio", 40);
        registro1.construirEdificio(lote2, edificio1);
        System.out.println(registro1.getEscrituras());
    }
}
