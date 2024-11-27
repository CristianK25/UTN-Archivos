class Sector:
    def __init__(self,nombreSector: str) -> None:
        self.nombreSector = nombreSector
        self.lista_Atracciones = []

    def totalMetrosSector(self):
        return sum(atraccion.metrosCuadrados for atraccion in self.lista_Atracciones)
    
    def totalConstruccionSector(self):
        return sum(atraccion.costoAtraccion for atraccion in self.lista_Atracciones)