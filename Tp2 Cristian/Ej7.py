def tamañoCadena(cadena):
    print(f"Tamaño de la frase: {cadena}")
    print(len(cadena))

def cantvocales(cadena):
    vocales = ("a","e","i","o","u")
    cantVocales = 0
    for caracter in cadena:
        if caracter in vocales:
            cantVocales += 1
    return cantVocales 

def main():
    cadena = input("Ingrese una cadena: ")
    tamañoCadena(cadena)
    cantVocales = cantvocales(cadena.lower())
    print(f"Cantidad de vocales en \"{cadena}\" es: {cantVocales}")

if __name__ == "__main__":
    main()