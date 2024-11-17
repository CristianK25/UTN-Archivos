from Edificio import Edificio
from Piso import Piso
from Departamento import Departamento
from Ambiente import Ambiente
from metodos import numeroPositivoEntero
class CalculoEdificio:
    cotizacion = [
        ["AAA","COCINA", 20 ,21000],
        ["BBB","HABITACION", 12 ,10000], 
        ["CCC","BAÑO ESTÁNDAR", 6 ,9000], 
        ["DDD","HABITACION PREMIUM", 16 ,15000], 
        ["EEE","BAÑO PREMIUM", 8 ,12000], 
        ["FFF","ESCRITORIO", 10 ,8000], 
        ["GGG","COMEDOR", 30 ,25000]  
    ]

    def main(self):
        nombreEd = input("Ingrese el nombre del edificio: ")
        self.edificio = Edificio(nombreEd)
        cantidadPisos = CalculoEdificio.validarPisos()
        CalculoEdificio.ingresarPisos(cantidadPisos)

    
    def ingresarPisos(self,cantidadPisos: int):
        for i in range(cantidadPisos):
            cantAmbientes = numeroPositivoEntero("Ingresa la cantidad de ambientes: ")
            CalculoEdificio.ingresarAmbiente(cantAmbientes)

    def ingresarAmbiente(self,cantAmbientes):
        baños = ("CCC","EEE")
        for i in range(cantAmbientes):
            pass


    def validarAmbiente():
        while True:
            cantAmbientes = numeroPositivoEntero("Ingresa la cantidad de ambientes: ")
            if 3 <= cantAmbientes <= 7:
                return cantAmbientes
            else: 
                print("Valor fuera del rango (3,12)")
        


    def validarPisos(self):
        while True:
            cantidadPisos = numeroPositivoEntero("Ingrese la cantidad de pisos: ")
            if 3 <= cantidadPisos <= 12:
                return cantidadPisos
            else: 
                print("Valor fuera del rango (3,12)")




CalculoEdificio.main()