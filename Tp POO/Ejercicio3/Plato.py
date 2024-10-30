class Plato:
    def __init__(self, nombreCompleto,precio,esBebida):
        self.name = nombreCompleto
        self.precio = precio
        self.esBebida = esBebida
        self.listaIngredientes = []

    def  agregarIngredientes(self, ingrediente):
        self.listaIngredientes.append(ingrediente)

    def getEsBebida(self):
        return self.esBebida

    #notas_str = ", ".join(str(nota) for nota in self.notas)
    def __str__(self):
        ingr = "\n".join([str(ing) for ing in self.listaIngredientes])
        return f"\t\nPlato: {self.name},\n\t Precio: {self.precio},\n\t Ingredientes:\n{ingr}"
