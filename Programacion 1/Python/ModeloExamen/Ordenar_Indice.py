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
        
lista = []
fil = int(input("filas: "))
col= int(input("col: "))

for i in range(fil):
    filas = []
    for j in range(col):
        num = int(input(f"Ingrese {i}{j}:"))
        filas += [[num]]
    lista += filas

def copiarLista(lista):
    listacopy = [[0 for _ in range(len(lista[0]))] for _ in range(len(lista))]
    for i in range(len(lista)):
        for j in range(len(lista[0])):
            listacopy[i][j] = lista[i][j]
    return listacopy

listacopy = copiarLista(lista)
n = len(listacopy)
for i in range(n):
    for j in range(n - i - 1):
        if (listacopy[j] > listacopy[j+1]):
            listacopy[j] , listacopy[j+1] = listacopy[j+1] , listacopy[j]

print("Lista sin ordenar: ",lista)

print("Lista ordenada: ",listacopy)

print("Lista dos columnas \n(1_columna ordenada menor a mayor)\n(2_columna indices originales)")
listaDosColumnas = dosColumnas()
print(listaDosColumnas)





