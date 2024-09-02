
def main():
    cadena = "La lluvia en Mendoza es escasa"
    asciiLista = ascii(cadena)
    print(" ".join(map(str, asciiLista)))

def ascii(cad):
    asciiNumeros = list()
    
    for i in cad:
        aux = ord(i)
        asciiNumeros.append(aux)
    return asciiNumeros

if __name__ == "__main__":
    main()