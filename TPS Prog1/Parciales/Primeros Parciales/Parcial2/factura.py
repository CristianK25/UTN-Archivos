from metodos import numeroPositivoEntero
lista_articulos = [
    [101,"Leche",250],
    [102,"Gaseosa",300],
    [103,"Fideos",150],
    [104,"Arroz",280],
    [105,"Vino",1200],
    [106,"Manteca",200],
    [107,"Lavandina",180],
    [108,"Detergente",460],
    [109,"Jabon en Polvo",960],
    [110,"Galletas",600],
]

cliente = {
    "20110425417" :"Rodolfo Fernandez", 
    "30527419655" :"Los Pollos Hnos ",
    "27289425478" :"Andrea Pereira" ,
    "33536549878" :"Multimarca Repuestos", 
    "20291122568": "Luis Peric "
}


def main():
    detallesFactura = []
    factura = crearFactura()
    solicitarFechaNumero(factura)
    factura["cliente"] = solicitarCuit(factura)
    solicitarArticulo(factura)
    calcularTotal(factura)
    calcularIva(factura)
    letraFactura(factura)
    calcularTotalConIva(factura)
    print(factura)


def crearFactura():
    return {
        "fecha":"",
        "numero":0,
        "letra":"",
        "total":0.0,
        "monto_iva":0.0,
        "cliente":"",
        "detalles":[0 for _ in range(5)],
        "cantidad_productos":0
    }

def solicitarFechaNumero(factura):
    factura["fecha"] = input("Ingrese la fecha de la factura: ")
    factura["numero"] = numeroPositivoEntero("Ingrese el numero: ")

def solicitarCuit(factura):
    while True:
        cuit = input("Ingrese el CUIT del cliente: ")
        if (len(cuit)==11 and cuit[:2] in ["20","27","30","33"]):
            if (cuit in cliente):
                return cliente[cuit]
            else:
                return "Consumidor Final"
        else:
            print("CUIT inválido. Debe comenzar con 20, 27, 30 o 33 y tener 11 caracteres.")    

def solicitarArticulo(factura):
    while True:
        codigo = input("Ingrese el codigo del articulo (Use \"0000\" para salir): ")
        if codigo == "0000":
            break
        encontrado = False
        for articulo in lista_articulos:
            if int(codigo) == articulo[0]:
                encontrado = True
                cantidad = numeroPositivoEntero(f"Ingrese la cantidad del {articulo[1]}: ")
                subtotal = cantidad * articulo[2]
                factura["detalles"][factura["cantidad_productos"]] = [articulo[0],articulo[1],cantidad,articulo[2],subtotal]
                factura["cantidad_productos"] += 1
        if encontrado== False:
            print("Articulo no encontrado. Por favor, ingrese el codigo nuevamente.")

def calcularTotal(factura):
    total = 0
    for articulo in factura["detalles"]:
        total += articulo[4]
    factura["total"] = total


def calcularIva(factura):
    if ( factura["cliente"][:2] in ["20","27"] or factura["cliente"] == "Consumidor Final"):
        factura["monto_iva"] = 0
    elif(factura["cliente"][:2] in ["30","33"]):
        factura["monto_iva"] = factura["total"] * 0.21

def letraFactura(factura):
    if ( factura["cliente"][:2] in ["20","27"] or factura["cliente"] == "Consumidor Final"):
        factura["letra"] = "B"
    elif(factura["cliente"][:2] in ["30","33"]):
        factura["letra"] = "A"
    
def calcularTotalConIva(factura):
    if (factura["letra"]== "A"):
        factura["total"] += factura["monto_iva"]


#METODO PARA MAIN
if __name__ == "__main__":
    main()