def nroBilletes(dinero):
    billetes = [200,100,50,20,10,5,2,1,0.50,0.25,0.10,0.05]
    cantBilletes = dict.fromkeys(billetes,0)
    parteEntera, parteDecimal = divmod(dinero,1)
    count = 0

    # Iteramos sobre las claves del diccionario
    for billete in billetes:
        if parteEntera >= billete:
            #Accedo al valor de la clave en cantBilletes
            cantBilletes[billete] = int(dinero // billete) 
            dinero = round(dinero % billete, 2)
    return cantBilletes

def mostrarBilletes(denominacion):
    for i in denominacion   :
        valor = denominacion[i]
        if (valor != 0):
            print(f"{valor} billete de {i}", end=", ")

def main():
    dinero = float(input("Ingrese una cantidad de dinero: "))
    billetes = nroBilletes(dinero)
    mostrarBilletes(billetes)
    



if __name__ == "__main__":
    main()