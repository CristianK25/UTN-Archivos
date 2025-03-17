from Edificio import Edificio
from Piso import Piso
from Departamento import Departamento
from Ambiente import Ambiente
from metodos import numeroPositivoEntero
import os
import platform

def limpiar_pantalla():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")

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
        cantidadPisos = self.validarPisos()
        self.ingresarPisos(cantidadPisos)
        self.mostrarInformacion()

    def mostrarInformacion(self):
        limpiar_pantalla()
        print("-----------Edificio---------------- ")
        print(f"Nombre: {self.edificio.nombre}")
        print("-----------Pisos-----------------")
        for piso in self.edificio.lista_pisos:
            print(f"\n\nPiso: {piso.nroPiso} (Planta Baja)" if piso.nroPiso == 0 else f"Piso: {piso.nroPiso}")
            print("---------Departamentos del Piso------------------")
            for departamento in piso.lista_departamentos:
                print(f"Letra Dpto: {departamento.letra}")
                print("--------Ambientes---------------------- ")
                for ambiente in departamento.lista_ambientes:
                    print(f"{ambiente.tipoAmbiente}\t   {ambiente.metrosCuadrados}")
                print(f"TOTAL METROS CUADRADOS DPTO: {departamento.totalMetrosCuadrado()}")
        print(f"TOTAL METROS CUADRADOS EDIFICIO: {self.edificio.calcular_total_metros_cubiertos()} metros")
        print(f"TOTAL COSTO DE CONSTRUCCION EDIFICIO: ${self.edificio.calcular_total_costo_construccion()}")
        print(f"COSTO PROMEDIO POR METROS CUADRADO: {self.edificio.totalCC / self.edificio.totalMC}")
    
    def ingresarPisos(self,cantidadPisos: int):
        for i in range(cantidadPisos):
            piso = Piso(i)
            self.edificio.lista_pisos.append(piso)
            cantidadDepartamentos = numeroPositivoEntero(f"Ingresa la cantidad de departamentos en Piso {i} : ")
            self.ingresarDepartamento(piso,cantidadDepartamentos)

            

    def ingresarDepartamento(self,piso: Piso,cantidadDepartamentos: int):
        for _ in range(cantidadDepartamentos):
            while True:
                letra = input("Ingrese la Letra del departamento: ")
                cantAmb = numeroPositivoEntero("Ingrese la cantidad de ambientes: ")
                if cantAmb < 3:
                    print("La cantidad de ambiente no puede ser menor a 3")
                    continue
                ambientesTemporal = []
                totalMetrosDepartamento = 0
                tieneBaño = False
                for _ in range(cantAmb):
                    ambiente = self.ingresarAmbiente()
                    ambientesTemporal.append(ambiente)
                    totalMetrosDepartamento += ambiente.metrosCuadrados
                    if ambiente.tipoAmbiente in ("BAÑO ESTÁNDAR","BAÑO PREMIUM"):
                        tieneBaño = True

                if totalMetrosDepartamento > 800:
                    print("El departamento no puede tener mas de 800 metros cuadrados")
                    continue
                if not tieneBaño:
                    print("El departamento debe tener un baño")
                    continue
                departamento = Departamento(letra)
                for ambiente in ambientesTemporal:
                    departamento.lista_ambientes.append(ambiente)
                    print(f"Ambiente: {ambiente.tipoAmbiente} agregado ")
                piso.lista_departamentos.append(departamento)
                print(f"Departamento {departamento.letra} agregado al {piso.nroPiso}")
                break


    def ingresarAmbiente(self):
        while True:
            codigoAmb = input("Ingrese el codigo del ambiente: ")
            for i in range(len(self.cotizacion)):
                if self.cotizacion[i][0] == codigoAmb:
                    ambiente = Ambiente(self.cotizacion[i][1],self.cotizacion[i][2],self.cotizacion[i][3])
                    return ambiente
            print("Codigo no encontrado")

        

    def validarPisos(self):
        while True:
            cantidadPisos = numeroPositivoEntero("Ingrese la cantidad de pisos: ")
            if 3 <= cantidadPisos <= 12:
                return cantidadPisos
            else: 
                print("Valor fuera del rango (3,12)")



main = CalculoEdificio()
main.main()