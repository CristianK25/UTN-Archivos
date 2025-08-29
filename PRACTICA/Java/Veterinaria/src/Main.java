import Dominio.Animal;
import Dominio.Perro;
import Dominio.Raza;

public class Main {
    public static void main(String[] args) {
        Raza r = new Raza("nombreRaza", "Canina");
        Perro p = new Perro("4405","Canina");
        Animal a = p;


        if (a instanceof Perro) {
            Perro p2 = (Perro)a;
        }

    }
}
