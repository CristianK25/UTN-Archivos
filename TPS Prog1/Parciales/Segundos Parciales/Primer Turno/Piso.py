class Piso:
    def __init__(self, nroPiso: int):
        self.nroPiso = nroPiso
        self.lista_departamentos = []

    def calcular_total_metros_cubiertos(self):
        return sum(departamento.totalMetrosCuadrado() for departamento in self.lista_departamentos)

    def calcular_total_costo_construccion(self):
        return sum(departamento.totalCostoConstruccion() for departamento in self.lista_departamentos)