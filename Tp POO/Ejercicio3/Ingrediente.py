class Ingrediente:
    def __init__(self, nombre, cantidad,unidadMedida):
        self.nome = nombre
        self.quantidade = cantidad
        self.unidadeMedida = unidadMedida
    def __str__(self):
        return f"\t-Nombre: {self.nombre}\n\t-Cantidad: {self.quantidade}\n\t-Unidad de Medida: {self.unidadeMedida}"