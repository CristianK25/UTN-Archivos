class Edificio:
    def __init__(self, nombre: str):
        self.nombre = nombre
        self.totalMC = 0.0
        self.totalCC = 0.0
        self.lista_pisos = []

    def calcular_total_metros_cubiertos(self):
        self.totalMC = sum(piso.calcular_total_metros_cubiertos() for piso in self.lista_pisos)
        return self.totalMC

    def calcular_total_costo_construccion(self):
        self.totalCC = sum(piso.calcular_total_costo_construccion() for piso in self.lista_pisos)
        return self.totalCC