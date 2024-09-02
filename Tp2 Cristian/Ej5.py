def quitarEspacios(cadena):
    listaCadena = cadena.split()
    return "".join(listaCadena)

def main():
    cadena = input("Ingrese una cadena: ")
    cadenaSinEspacio = quitarEspacios(cadena)
    print(cadenaSinEspacio)

if __name__ == "__main__":
    main()