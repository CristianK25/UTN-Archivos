from Ej21 import valorPositivoEntero

def main():
    nro = valorPositivoEntero()
    nro = list(str(nro))
    convertirAInt(nro)

    resultado = recursion(nro)
    print(f"\nResultado = {resultado}")

def convertirAInt(nro):
    i = 0
    while i < len(nro):
        nro[i] = int(nro[i])
        i+=1

def recursion(nro,i=0):
    if i+1 == len(nro):
        print(nro[i])
        return nro[i]
    else:
        print(nro[i],"+ ",end="")
        return nro[i] + recursion(nro,i+1)


if __name__ == "__main__":
    main()