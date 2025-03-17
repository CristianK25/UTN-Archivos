package PaisesProvinciasCiudades;

public class Main {
    public static void main(String[] args) {
        Pais Argentina = new Pais();
        Provincia Mendoza = new Provincia();
        Ciudad Guaymallen = new Ciudad();


        Argentina.agregarProvincia(Mendoza);
    }
}