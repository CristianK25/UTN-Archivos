class Departamento:
    def __init__(self, letra: str):
        self.letra = letra
        self.lista_ambientes = []

    def totalMetrosCuadrado(self):
        return sum(ambiente.metrosCuadrados for ambiente in self.lista_ambientes)

    def totalCostoConstruccion(self):
        return sum(ambiente.costoAmbiente for ambiente in self.lista_ambientes)