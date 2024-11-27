class Atleta:
    def __init__(self,nombreCompleto: str,tiempoRealizado: float) -> None:
        self.nombreCompleto = nombreCompleto
        self.tiempoRealizado = tiempoRealizado

    def __str__(self) -> str:
        return f"{self.nombreCompleto} - {self.tiempoRealizado} "
        