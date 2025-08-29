package Dominio;

public class Perro extends Animal {
    private String idChip;
    private String Raza;

    public Perro() {
    }

    public Perro(String idChip, String raza) {
        this.idChip = idChip;
        Raza = raza;
    }

    public String getIdentificacion() {
        return idChip;
    }

    public String getRaza() {
        return Raza;
    }

    @Override
    public String emitirSonido() {
        return "Gau";
    }

    @Override
    public String getDieta() {
        return "Comida Perro";
    }

    @Override
    public boolean neesitaVacunaAnual() {
        return false;
    }
}
