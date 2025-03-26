package ImpuestoPais;

import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author cristian
 */
public class Main {
    private static Scanner sc = new Scanner(System.in);
    static ArrayList<Provincia> provincias = new ArrayList<>();
    static ArrayList<Ciudad> ciudades = new ArrayList<>();
    public static void main(String[] args) {
        Impuesto imp1 = new Impuesto("Impuesto a las ganancias",5000000);
        Impuesto imp2 = new Impuesto("IVA", 150000);
        Impuesto imp3 = new Impuesto("Impuesto Pais", 250500);
        Impuesto imp4 = new Impuesto("Bienes Personales", 150000);
        Impuesto imp5 = new Impuesto("Afano", 15000000);
        Impuesto impuestos[] = {imp1,imp2,imp3,imp4,imp5};
        
        Ciudad ciudad1 = new Ciudad("Berlin",4500000.150,impuestos);
        Ciudad ciudad2 = new Ciudad("Uganda",51555250,impuestos);
        Ciudad ciudad3 = new Ciudad("Guaymallen",1550,impuestos);
        Ciudad ciudad4 = new Ciudad("Hurlingam",1850000,impuestos);
        Ciudad ciudad5 = new Ciudad("Narnia",15000,impuestos);
        
        ciudades.add(ciudad1);
        ciudades.add(ciudad2);
        ciudades.add(ciudad3);
        ciudades.add(ciudad4);
        ciudades.add(ciudad5);
        
        
        Provincia prov1 = new Provincia("Mendoza",ciudades);
        Provincia prov2 = new Provincia("Tucuman",ciudades);
        Provincia prov3 = new Provincia("Neuquen",ciudades);
        
        provincias.add(prov1);
        provincias.add(prov2);
        provincias.add(prov3);
        
        Pais pais = new Pais("Argentina",provincias);
        pais.ciuadesConDeficit();
        
        
    }
    
}
