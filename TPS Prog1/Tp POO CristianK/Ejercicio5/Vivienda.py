class Vivienda:
    def __init__(self, calle, numero, manzana,nroCasa,superficieTerreno):
        self.calle = calle
        self.numero = numero
        self.manzana = manzana
        self.nroCasa = nroCasa
        self.superficieTerreno = superficieTerreno
        self.listaHabitaciones = []

    def getMetrosCuadradosCubiertos(self):
        metrosCubiertos = sum(habitacion.metrosCuadrados for habitacion in self.listaHabitaciones)
        if metrosCubiertos > self.superficieTerreno:
            print("La superficie cubierta no puede ser mayor a la superficie del terreno")
        else:
            return metrosCubiertos
        
    def agregarHabitacion(self,habitacion):
        self.listaHabitaciones.append(habitacion)