import math
def main():
    cadena = input("Ingrese una cadena: ")
    recursion(cadena)

def recursion(cadena,i=-1):
    if (abs(i) == len(cadena)):
        print(cadena[i])
        return
    else:
        print(cadena[i],end="")
        recursion(cadena,i-1)

if __name__ == "__main__":
    main()

