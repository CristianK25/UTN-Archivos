class Celda:
    def __init__(self,fila: int,columna:int,valor: str):
        self.fila = fila
        self.columna = columna
        self.valor = valor

    
         
class Matriz:
    celdasMatriz = []
    def __init__(self,celdasMatriz: list):
        self.celdasMatriz = celdasMatriz

    def ingresarCeldas():
        while(True):    
            valor = (input("Ingrese un valor para la celda: "))
            if valor == "FIN":
                    break
            fila = int(input("Ingrese un valor para la celda: "))
            columna = int(input("Ingrese un valor para la celda: "))
            if Matriz.validarCelda(fila,columna):
                celda1 = Celda(fila,columna,valor)
                Matriz.celdasMatriz[fila][columna] = celda1

    @classmethod
    def mostrarCeldas():
        pass 


def main():
    Matriz.ingresarCeldas()
    


    

if __name__ == "__main__":
    main()


