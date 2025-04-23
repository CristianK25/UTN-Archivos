"""
Ejercicio 11: Contar Ocurrencias de un Elemento 
Escribe  un programa que  permita al usuario  ingresar una lista y un número, y cuente 
cuántas veces aparece ese número en la lista.
"""
from metodosListas import llenarLista,numeroEntero

def repeticionNumero(lista,nro):
    veces = 0
    for i in range(0,len(lista)):
        if nro == lista[i]:
            veces += 1
    return veces

def main():
    lista = llenarLista()
    nro = numeroEntero("Ingrese un numero para contar cuantas veces se repite en la lista: ")
    veces = repeticionNumero(lista,nro)
    print(f"El numero {nro} se repite {veces} veces")

def dosColumnas():
    listaDosColumnas = [[0 for _ in range(2)] for _ in range(fil)]
    for i in range(fil):
        listaDosColumnas[i][0] = listacopy[i][0]
        listaDosColumnas[i][1] = indiceoriginal(listacopy[i][0],lista)
    return listaDosColumnas

def indiceoriginal(valor,lista):
    for i, sublista in enumerate(lista):
        if sublista[0] == valor:
            return i
    return -1
def copiarLista(lista):
    listacopy = [[0 for _ in range(len(lista[0]))] for _ in range(len(lista))]
    for i in range(len(lista)):
        for j in range(len(lista[0])):
            listacopy[i][j] = lista[i][j]
    return listacopy
def ordenar():
    listacopy = copiarLista(lista)
    n = len(listacopy)
    for i in range(n):
        for j in range(n - i - 1):
            if (listacopy[j] > listacopy[j+1]):
                listacopy[j] , listacopy[j+1] = listacopy[j+1] , listacopy[j] 
                
if __name__ == "__main__":
    main()