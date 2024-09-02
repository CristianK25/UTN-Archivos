def main():
    cadena = input("Ingrese una cadena: ")
    opcion = int(input("Desea convertirla en:\n1_Mayuscula\n2_Minuscula"))
    while opcion not in (1,2):
        opcion = int(input("Ingrese devuelta una opcion: "))
    mayusculas_minusculas(opcion,cadena)

def mayusculas_minusculas(n,cadena):
    resultado = cadena
    if n == 1:
        resultado = cadena.upper()
    else:
        resultado = cadena.lower()
    print(resultado)

if __name__ == "__main__":
    main()