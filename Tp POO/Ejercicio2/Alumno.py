from Nota import  Nota
class Alumno:
    def __init__(self, nombreCompleto, legajo):
        self.nombreCompleto = nombreCompleto
        self.legajo = legajo
        self.notas = []

    def ingresoNota(self,notas):
        self.notas = notas
    
    def __str__(self):
        return  f"---\nNombre: {self.nombreCompleto},\nLegajo: {self.legajo},\nNotas: {self.notas}\n---"
