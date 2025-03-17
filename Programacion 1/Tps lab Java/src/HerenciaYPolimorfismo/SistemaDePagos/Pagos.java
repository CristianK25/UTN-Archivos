package HerenciaYPolimorfismo.SistemaDePagos;

import java.util.ArrayList;

public class Pagos {
    private ArrayList<MetodoPago> metodosPagos = new ArrayList<>();


    public void agregarMetodo(MetodoPago metodo){
        metodosPagos.add(metodo);
    }

    public void realizarPago(int numero){
        for(MetodoPago metodo: metodosPagos){
            if (metodo.getNumero() == numero){
                metodo.realizarPago();
            }
        }
    }

    public void cancelarPagos(int numero){
        for(MetodoPago metodo: metodosPagos){
            if (metodo.getNumero() == numero && metodo instanceof Cancelable){
                ((Cancelable) metodo).cancelarPago();
            }
        }
    }

    public void mostrarPagos(){
        for(MetodoPago metodo: metodosPagos){
            System.out.println(metodo);
        }
    }
}
