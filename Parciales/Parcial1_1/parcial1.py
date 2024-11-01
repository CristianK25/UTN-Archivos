from metodos import numeroPositivoEntero
golosinas = [
    [1,"KitKat",20],
    [2,"Chicles",50],
    [3,"Caramelos de Menta",50],
    [4,"Huevo Kinder",10],
    [5,"Chetoos",10],
    [6,"Twix",10],
    [7,"M&M's",10],
    [8,"Papas Lays",2],
    [9,"Milkybar",10],
    [10,"Alfajor Tofi",15],
    [11,"Lata Coca",20],
    [12,"Chisitos",10]
]
empleados= {
   1100:"José Alonso",
   1200:"Federico Pacheco",
   1300:"Nelson Pereira",
   1400:"Osvaldo Tejada",
   1500:"Gastón Garcia", 
}
golosinasPedidas = []

def main():
    mostrarGolosinas()
    pedirGolosina()
    mostrarGolosinas()
    
#!Metodos para pedir golosinas
def pedirGolosina():
    legajo = numeroPositivoEntero("Ingrese su legajo: ")
    if(legajo in empleados):
        print(f"Bienvenido {empleados[legajo]}")
        #Pedir codigo de la golosina
        mostrarMenuGolosinas()
        codigoGolosina = numeroPositivoEntero("Ingrese el codigo de la golosina: ")
        #Verificar si la golosina existe
        if(codigoGolosina in [item[0] for item in golosinas]):#?Buena forma de saber si existe el codigo
            if(golosinas[codigoGolosina][2]  > 0):
                #Agrega  la golosina a la lista de golosinas pedidas
                golosinasPedidas.append([legajo,codigoGolosina,golosinas])
                #Elimina una golosina del stock
                golosinas[codigoGolosina-1][2] -=1                
    else:
        print("Legajo no encontrado")
#!Menu Golosinas a pedir
def mostrarMenuGolosinas():
    for i in range(len(golosinas)):
        print(f"{golosinas[i][0]} || {golosinas[i][1]}")
        print("-----------------")

def mostrarGolosinas():
    for i in golosinas:
        print(i)

def rellenarGolosinas():
    pass

def apagarMaquina():
    pass

if __name__ == "__main__":
    main()