package ClasePlaneta;


enum TipoPlaneta {
    GASEOSO,TERRESTRE,ENANO;
}
public class Planeta {
    private String nombre;
    private int cantSaltelites = 0;
    private double masa=0;
    private double volumen=0;
    private int diametro=0;
    private int distanciaAlSol;
    private TipoPlaneta tipoPlaneta;
    private boolean observabeASimpleVista;
    private double periodoOrbital;
    private double periodoRotacion;

    public Planeta(String nombre, int cantSaltelites, double masa, double volumen, int diametro, int distanciaAlSol,
                   TipoPlaneta tipoPlaneta, boolean observabeASimpleVista, double periodoOrbital, double periodoRotacion) {
        this.nombre = nombre;
        this.cantSaltelites = cantSaltelites;
        this.masa = masa;
        this.volumen = volumen;
        this.diametro = diametro;
        this.distanciaAlSol = distanciaAlSol;
        this.tipoPlaneta = tipoPlaneta;
        this.observabeASimpleVista = observabeASimpleVista;
        this.periodoOrbital = periodoOrbital;
        this.periodoRotacion = periodoRotacion;
    }

    public double calcularDensidad(){
        return masa/volumen;
    }

    public boolean esExterior(){
        double distanciaEnUA = (double) distanciaAlSol /149597870;
        return distanciaEnUA > 3.4;
    }

    public String getNombre() {
        return nombre;
    }

    @Override
    public String toString() {
        return "Planeta" +
                "\nnombre = '" + nombre + '\'' +
                "\ncantSaltelites = " + cantSaltelites +
                "\nmasa = " + masa +
                "\nvolumen = " + volumen +
                "\ndiametro = " + diametro +
                "\ndistanciaAlSol = " + distanciaAlSol +
                "\ntipoPlaneta = " + tipoPlaneta +
                "\nobservabeASimpleVista= " + observabeASimpleVista+
                "\nPeriodo orbital del planeta = "+ periodoOrbital+
                "\nPeriodo de rotacion del planeta = "+ periodoRotacion;

    }


}
