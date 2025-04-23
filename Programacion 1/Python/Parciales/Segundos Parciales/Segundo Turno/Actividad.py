class Actividad:
    def __init__(self, tipoActividad: str, tipo:str,costoActividad: float):
        self.tipoActividad = tipoActividad
        self.tipo = tipo
        self.costoActividad = costoActividad

    def __str__ (self):
        return f"{self.tipoActividad}\t {self.tipo}\t {self.costoActividad}"
        
