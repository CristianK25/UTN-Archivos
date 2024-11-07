from Vivienda import Vivienda
class Barrio:
    def __init__(self,nombre,empresaConstructora) -> None:
        self.nombre = nombre
        self.empresaConstructora = empresaConstructora
        self.listaViviendas= []

    def getSuperficieTotalTerreno(self):
        return sum(vivienda.getSuperficieTerreno() for vivienda in self.listaViviendas)

    def getSuperficieTotalTerrenoXManzana(self,manzana):
        return sum(vivienda.getSuperficieTerreno() for vivienda in self.listaViviendas if manzana == vivienda.manzana)

    def getMetrosCuadradosCubiertos(self):
        return sum(vivienda.getMetrosCuadradosCubiertos() for vivienda in self.listaViviendas)

    def agregarVivienda(self,vivienda):
        self.listaViviendas.append(vivienda)