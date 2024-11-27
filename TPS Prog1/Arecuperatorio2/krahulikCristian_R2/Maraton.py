from Carrera import Carrera
from Atleta import Atleta
from metodos import numeroPositivoFlotante

class Maraton:
    def __init__(self) -> None:
        self.maratones = [
            ["AAA", "Maratón de Boston", "EEUU", 55],
            ["BBB", "Maratón de Roma", "Roma", 52],
            ["CCC", "Maratón de Paris", "Francia", 51],
            ["DDD", "Maratón de Buenos Aires", "Argentina", 53]
        ]


    def main(self):
        self.carrera = self.validarCodigo()
        self.ingresoAtleta()
        self.mostrar()


    def mostrar(self):
        print("\n\nNombre Carrera: ", self.carrera.nombreCarrera)
        print("Pais Carrera: ", self.carrera.paisCarrera)
        print("Distancia Carrera: ", self.carrera.kmCarrera)
        print("Ganador Carrera: ", self.carrera.ganadorCarrera)
        print("------------------------------------- Podio Atletas ----------------------------------")
        print("Oro: ",self.carrera.podioCarrera[0])
        print("Plata: ", self.carrera.podioCarrera[1])
        print("Bronce: ", self.carrera.podioCarrera[2])
        print("--------------------------------------------------")
        print("El promedio de los tiempos realizados por todos los atletas es: ", self.carrera.promedioTiempos)
        print("--------------------------------------------------")
        print("La lista completa de atltetas participantes en la carrera fue: ")
        for atleta in self.carrera.competidores:
            print(atleta.nombreCompleto," con un tiempo de: ", atleta.tiempoRealizado)

        
    def ingresoAtleta(self):
        while True:
            nombreAtlteta = input("Ingrese el nombre del atlteta: ")
            tiempoCompleto = numeroPositivoFlotante("Ingrese el tiempo realizado: ")
            atleta = Atleta(nombreAtlteta,tiempoCompleto)
            self.carrera.competidores.append(atleta)
            if (self.salida()):
                self.carrera.ganador()
                self.carrera.promedio()
                self.carrera.podio()
                break


    def salida(self):
        while True:
            respuesta = input("¿Desea salir? (Ingrese la palabra salir): ")
            if respuesta.lower() == "salir":
                return True
            else:
                return False


    def validarCodigo(self):
        while True:
            n = input("Ingrese el codigo de la maraton:")
            for i in range(len(self.maratones)):
                if n == self.maratones[i][0]:
                    nombre = self.maratones[i][1]
                    pais = self.maratones[i][2]
                    distancia = self.maratones[i][3]
                    ca = Carrera(pais, nombre,distancia)
                    return ca
            else: 
                print("Codigo no encontrado. Vuelva a ingresar")





maraton = Maraton()
maraton.main()