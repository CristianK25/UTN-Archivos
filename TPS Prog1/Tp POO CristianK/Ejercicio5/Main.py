from Barrio import Barrio
from Vivienda import Vivienda
from Habitacion import Habitacion
from metodos import numeroPositivoEntero, numeroPositivoFlotante

class Main:

    def main():
        nombre = input("Ingrese el nombre del barrio: ")
        empresa = input("Ingrese el nombre de la empresa constructora: ")
        barrio = Barrio(nombre,empresa)
        Main.ingresarViviendas(barrio)
        Main.mostrarInfo(barrio)

    @staticmethod
    def ingresarViviendas(barrio: Barrio):
        while True:    
            calle = input("Ingrese la calle de la vivienda: ")
            if calle in ("FIN","fin"):
                break
            numero = numeroPositivoEntero("Ingrese el numero de la vivienda: ")
            manzana = input("Ingrese la manzana de la vivienda: ")
            superficie = numeroPositivoFlotante("Ingrese la superficie del terreno: ")
            vivienda = Vivienda(calle,numero,manzana,superficie)
            while True:
                nombre = input("Ingrese el nombre de la habitacion: ")
                if nombre in ("FIN","fin"):
                    break
                metros = numeroPositivoFlotante(f"Ingrese la cantidad de metros cuadrados de {nombre}: ")
                habitacion = Habitacion(nombre,metros)
                vivienda.agregarHabitacion(habitacion)
                metrosC = vivienda.getMetrosCuadradosCubiertos()
                if metrosC is not None:
                    barrio.agregarVivienda(vivienda)

    def mostrarInfo(barrio : Barrio):
        print("Barrio: ",barrio.nombre)
        print("Superficie total del barrio: ",barrio.getSuperficieTotalTerreno())
        print("Superficie total cubierta: ",barrio.getMetrosCuadradosCubiertos())
        manzana = input("Ingrese una manzana: ")
        print(f"Superficie total del barrio por manzana ({manzana}): ",barrio.getSuperficieTotalTerrenoXManzana(manzana))

Main.main()