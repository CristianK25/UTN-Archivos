from metodos import numeroPositivoEntero
import os

golosinas = [
    [1,"KitKat",20],
    [2,"Chicles",50],
    [3,"Caramelos de Menta",50],
    [4,"Huevo Kinder",10],
    [5,"Chetoos",10],
    [6,"Twix",10],
    [7,"M&M'S",10],
    [8,"Papas Lays",2],
    [9,"Milkybar",10],
    [10,"Alfajor Tofi",15],
    [11,"Lata Coca",20],
    [12,"Chitos",10]
]

empleados = {
    "1100": "Jose Alonso",
    "1200": "Federico Pacheco",
    "1300": "Nelson Pereira",
    "1400": "Osvaldo Tejada",
    "1500": "Gaston Garcia",
}

clavesTecnico = ("admin","CCCDDD","2020")

golosinasPedidas = []
codigo = 0

def main():
    print("--Bienvendido--")
    legajo = str(numeroPositivoEntero("Ingrese el legajo: "))
    if (legajo in empleados):
        print(f"Empleado {empleados[legajo]}")
    else:
        print("Usted no es empleado de la empresa")

    while True:
        opcion = numeroPositivoEntero("Eliga una opcion\n1-Pedir Golosinas\n2-Mostrar golosinas\n3-Rellenar golosinas\n4-Apagar Maquina\n")
        match (opcion):
            case 1:
                pedirGolosinas()
            case 2: 
                mostrarGolosinas()
            case 3: 
                rellenarGolosinas()
            case 4: 
                apagarMaquina()
                break
            case _:
                print("Opcion no valida")

#?Metodos obligatorios
def pedirGolosinas():
    codigo = pedirCodigo()
    reducirStock(codigo)

def mostrarGolosinas():
    os.system("cls")
    for i in range(len(golosinas)):
        print(golosinas[i])

def rellenarGolosinas():
    codigo = pedirCodigoTecnico()
    rellenarStock(codigo)

def apagarMaquina():
    os.system("cls")
    print("Maquina apagada")


#?Metodos extra

def pedirCodigo():
    while True:
        codigo = numeroPositivoEntero("Ingrese el codigo de la golosina que quiere: ")
        os.system("cls")
        if 1 <= codigo <= len(golosinas):
            if (not revisarStock(codigo)):
                print(f"Lo  sentimos  la golosina {golosinas[codigo][1]} no se encuentra disponible, seleccione otra golosina o ingresa salir si no desea otra golosina")
                break
            else:
                print(f"Golosina {golosinas[codigo-1][1]} seleccionada con exito")
                return codigo
        else:
            print("Codigo no valido, ingrese un codigo entre 1 y 12")

def pedirCodigoTecnico():
    nombreTec = input("Ingrese el primer codigo: ")
    codTec = input("Ingrese el segundo codigo: ")
    fechaTec = input("Ingrese el tercer codigo: ")
    if (nombreTec == clavesTecnico[0] and codTec == clavesTecnico[1] and fechaTec == clavesTecnico[2]):
        return pedirCodigo()
    else:
        print("No  tiene  permiso  para ejecutar la función de recarga")

def reducirStock(codigo):
    for i in range(len(golosinas)):
        if(codigo == golosinas[i][0]):
            golosinas[i][2] -=1
            break

def revisarStock(codigo: int):
    # Buscar el índice de la golosina por su código
    for golosina in golosinas:
        if golosina[0] == codigo:
            return golosina[2] > 0  # Retorna True si hay stock, False si no
    return False  # Si no se encontró la golosina, retornar False

def rellenarStock(codigo):
    cantidad = numeroPositivoEntero(f"Cantidad de stock a rellenar en \"{golosinas[codigo-1][1]}\": ")
    for i in range(len(golosinas)):
        if(codigo == golosinas[i][0]):
            golosinas[i][2] += cantidad

if __name__ == "__main__":
    main()