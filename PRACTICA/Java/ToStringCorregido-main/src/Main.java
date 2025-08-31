public class Main {
    public static void main(String[] args) {

        Domicilio casa = Domicilio.builder()
                .calle("Calle falsa")
                .numero(123)
                .build();
        Persona p = Persona.builder()
                .nombre("Cristian")
                .edad(22)
                .domicilio(casa)
                .build();
        casa.setResidente(p);
        System.out.println(p);

    }
}