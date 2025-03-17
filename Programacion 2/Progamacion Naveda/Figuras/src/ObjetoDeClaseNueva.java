public class ObjetoDeClaseNueva {
    public static void main(String[] args) {
        ClaseNueva a1 = new ClaseNueva('u',1,2);
        ClaseNueva.cuales[ClaseNueva.cuantos] = a1;
        ClaseNueva.cuantos++;

        ClaseNueva b1 = new ClaseNueva('v');
        ClaseNueva.cuales[ClaseNueva.cuantos] = b1;
        ClaseNueva.cuantos++;

        ClaseNueva c1 = new ClaseNueva('w');
        ClaseNueva.cuales[ClaseNueva.cuantos] = c1;
        ClaseNueva.cuantos++;

        for (int i=0;i<ClaseNueva.cuantos;i++){
            ClaseNueva.cuales[i].mostrarAtributos();
        }
        System.out.println("Total objetos: "+ClaseNueva.cuantos);

    }
}
