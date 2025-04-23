import random
def main():
    while(True):
        opcion = verificarEnteroFloat("Como desea generar la lista\n1_Manual\n2_Aleatoria\n","")
        if (opcion not in (1,2)):
            print("Error, Debe ingresar 1-2")
        else:
            match (opcion):
                case 1: 
                    lista = llenarListaManual()
                case 2: 
                    lista = llenarListaAutomatica()
            break
    print(lista)
    mostrarLista(lista)
    print("\n\tLista columna\n",listaColumna(lista))
    

def listaColumna(lista):
    listaCol = list()
    for i in range(len(lista)):
        suma = 0
        for j in range(len(lista[0])):
            suma += lista[i][j]
        listaCol.append(suma)
    return listaCol

def mostrarLista(lista):
    fila = ""
    for i in range(len(lista)):
        for j in range(len(lista[0])):
            fila += str(lista[i][j]) + "  "
        print(fila)
        fila = ""

def llenarListaAutomatica():
    fil, col = definirFilCol()
    lista = [[round(random.uniform(1, 999), 2) for _ in range(col)] for _ in range(fil)]
    return lista

def definirFilCol():
    fil, col = 0,0
    lista = list()
    while(not valorMinimoLista(fil,col)):
        fil = verificarEnteroFloat("Ingrese las filas ","")
        lista.append(fil)
        col = verificarEnteroFloat("Ingrese las columnas ","")
        lista.append(col)
    return lista

def llenarListaManual():
    fil, col = definirFilCol()
    lista = [[0 for _ in range(col)] for _ in range(fil)]
    for i in range(fil):
        for j in range(col):
            lista[i][j] = verificarEnteroFloat(descripcion = f"\nIngrese el numero [{i}][{j}] ",condicion="lista")
    return lista

def verificarEnteroFloat(descripcion,condicion):
    while(True):
        try:
            if condicion == "lista":
                num = float(input(descripcion))    
            else:
                num = int(input(descripcion))
            if (not (num >=1 and num<=999)) :
                break
        except ValueError:
            print("Valor invalido.")
    return num

def valorMinimoLista(fil,col):
    if (fil >= 3 and col>=2):
        return True
    else:
        return False

if __name__ == "__main__":
    main()