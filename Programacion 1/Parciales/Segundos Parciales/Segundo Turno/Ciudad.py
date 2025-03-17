class Ciudad:
    def __init__(self,nombreCiudad:str,nombrePais:str) -> None:
        self.nombreCiudad = nombreCiudad
        self.nombrePais = nombrePais
        self.lista_Actividades = []

    def totalActividades(self):
        return len(self.lista_Actividades)