from metodos import numeroPositivoEntero
from PaqueteViaje import PaqueteViaje
from DiaViaje import DiaViaje
from Ciudad import Ciudad
from Actividad import Actividad

class Main:
    def __init__(self):
        self.cotizarActividades = [
            ["100","DESAYUNO","3000","4000"],
            ["200","ALMUERZO","8000","9000"] ,
            ["300","MEDIATARDE","4000","5000"], 
            ["400","CENA","7000", "8000" ],
            ["500","HOTEL 3 ESTRELLAS","25000","27000"], 
            ["600","HOTEL 4 ESTRELLAS","30000","32000"], 
            ["700","HOTEL 5 ESTRELLAS","35000","38000"], 
            ["800","VISITA MUSEO","3500","4500"], 
            ["900","CITY TOUR","5500","7500"]  
        ]
        
    def mostrarPaquete(self):
        print("-----------Paquete----------------")
        print("Nombre: ",self.paqueteViaje.nombre)
        print("Total de dias: ",len(self.paqueteViaje.lista_dias))
        for i in range(len(self.paqueteViaje.lista_dias)):
            print(f"Dia {i+1}:")
            print("---------Ciudades------------------")
            for ciudad in self.diaViaje.lista_Ciudades:
                print("Nombre: ",ciudad.nombreCiudad)
                print("Pais: ",ciudad.nombrePais)
                print("--------Actividades----------------------")
                for actividad in ciudad.lista_Actividades:
                    print(actividad)
        print("Costo Total Viaje: ",self.paqueteViaje.totalCostoViaje)
        print("Costo promedio por dia", self.paqueteViaje.totalCostoViaje / len(self.paqueteViaje.lista_dias))


    def main(self):
        while True:
            nombrePaquete = input("Ingrese el nombre del paquete: ")
            self.paqueteViaje = PaqueteViaje(nombrePaquete)
            self.cantidadDias = numeroPositivoEntero("Ingrese la cantidad de dias: ")
            self.ingresarDias()
            if (self.paqueteViaje.totalCostoViaje > 10000000):
                print("El costo del paquete es mayor a 10 millones de pesos")
            else:
                print("Paquete cotizado exitosamente")
                self.mostrarPaquete()
                break
        
    def ingresarDias(self):
        for i in range(self.cantidadDias):
            self.diaViaje = DiaViaje(i)
            self.cantidadCiudades = numeroPositivoEntero(f"Ingrese la cantidad de ciudades del dia {i+1}: ")
            self.ingresarCiudades()
            self.paqueteViaje.lista_dias.append(self.diaViaje)

    def ingresarCiudades(self):
        for i in range(self.cantidadCiudades):
            nombreCiudad = input("Ingrese el nombre de la ciudad: ")
            nombrePais = input("Ingrese el nombre del pais: ")
            self.ciudadViaje = Ciudad(nombreCiudad,nombrePais)
            cantidadActividades = numeroPositivoEntero(f"Ingrese la cantidad de actividades para {self.ciudadViaje.nombreCiudad}: ")
            self.validarActividades(cantidadActividades)
            self.diaViaje.lista_Ciudades.append(self.ciudadViaje)
                

    def ingresarActividades(self):
        while True:
            codigoActividad = input(f"Ingrese el codigo de la actividad : ")
            for i in range(len(self.cotizarActividades)):
                if self.cotizarActividades[i][0] == codigoActividad:
                    tipoCosto = self.validarTipoCosto == "E"
                    if (tipoCosto):
                        costo = self.cotizarActividades[i][3]
                    else:
                        costo = self.cotizarActividades[i][2]
                    actividad = Actividad(self.cotizarActividades[i][1],tipoCosto,costo)
                    return actividad
            print("Codigo no encontrado")

    
    #! metodos validacion
    def validarActividades(self,cantidadActividades):
        actividadesValidas = False
        while not actividadesValidas:
            lista_actividades = []
            cantidadHoteles = 0
            for i in range(cantidadActividades):
                actividad = self.ingresarActividades()
                lista_actividades.append(actividad)
            for i in range(len(lista_actividades)):
                if actividad.tipoActividad in ("HOTEL 3 ESTRELLAS", "HOTEL 4 ESTRELLAS", "HOTEL 5 ESTRELLAS"):
                    cantidadHoteles +=1
            if cantidadHoteles > 1:
                print("No pueden haber mas de un hotel en actividades")
            else:
                actividadesValidas = True
        for actividad in lista_actividades:
            self.ciudadViaje.lista_Actividades.append(actividad)
            self.paqueteViaje.total_Costo_Viaje(actividad.costoActividad)


    def validarDias():
        while True:
            cantidaddias = numeroPositivoEntero("Ingrese la cantidad de dias: ")
            if 7 <= cantidaddias <= 30:
                return cantidaddias
            
    def validarTipoCosto(self):
        while True:
            tipoCosto = input("Ingrese el tipo de costo (E/S): ")
            if tipoCosto == "E" or tipoCosto == "S":
                return tipoCosto


claseMain = Main()
claseMain.main()