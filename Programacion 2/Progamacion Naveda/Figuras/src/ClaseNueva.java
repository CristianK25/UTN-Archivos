public class ClaseNueva {
    public static ClaseNueva cuales[] = new ClaseNueva[100];
    public static int cuantos = 0;
    public int a;
    public int b;
    public final char letra;

    public ClaseNueva(char letra) {
        this.letra = letra;
    }

    public ClaseNueva(char letra, int a, int b) {
        this.letra = letra;
        this.b = b;
        this.a = a;
    }

    public int getB() {
        return b;
    }

    public void setB(int b) {
        this.b = b;
    }

    public void mostrarAtributos(){
        System.out.println("letra = " + letra);
        System.out.println("a = " + a+" b = " + b);
    }
    public static void otro(ClaseNueva x){
        System.out.println("Capacidad de cuales: "+ cuales.length);
        System.out.println("Valor de b: "+x.getB());
        System.out.println("Valor de cuantos: "+ cuantos);
    }
}