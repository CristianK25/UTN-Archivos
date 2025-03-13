package PaisesProvinciasCiudades;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        Pais Argentina = new Pais();
        Provincia Mendoza = new Provincia();
        Ciudad Guaymallen = new Ciudad();


        Argentina.agregarProvincia(Mendoza);
    }
}