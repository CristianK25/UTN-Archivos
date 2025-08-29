package Dominio;

import java.util.List;

public class ContenedorGenerico <T>{
    private List<T> elementos;

    public void agregarElemento(T elem){
        elementos.add(elem);
    }

    public T obtenerElemento(int indice){
        return elementos.get(indice);
    }
}
