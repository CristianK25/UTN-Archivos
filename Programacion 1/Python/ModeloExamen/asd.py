def copiarLista(lista):
    listacopy = [[0 for _ in range(len(lista[0]))] for _ in range(len(lista))]
    for i in range(len(lista)):
        for j in range(len(lista[0])):
            listacopy[i][j] = lista[i][j]
    return listacopy

# Ejemplo de uso
lista = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

listacopy = copiarLista(lista)
print("Lista original:", lista)
print("Lista copiada:", listacopy)