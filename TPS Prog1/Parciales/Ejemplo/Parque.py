class Parque:
    def __init__(self,nombre:str) -> None:
        self.nombre = nombre
        self.lista_Sectores = []

    def totalMetrosConstruidos(self):
        return sum( sector.totalMetrosSector() for sector in self.lista_Sectores)
        

    def totalCostoConstruccion(self):
        return sum( sector.totalConstruccionSector() for sector in self.lista_Sectores)