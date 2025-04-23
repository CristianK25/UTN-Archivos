class PaqueteViaje:
    def __init__(self,nombre:str):
        self.nombre = nombre
        self.lista_dias = []
        self.totalCostoViaje = 0

    def total_Costo_Viaje(self,costo):
        self.totalCostoViaje += int(costo)
        return self.totalCostoViaje