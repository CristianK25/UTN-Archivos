class Carrera:
    def __init__(self,paisCarrera: str,nombreCarrera:str,kmCarrera:float) -> None:
        self.paisCarrera = paisCarrera
        self.nombreCarrera = nombreCarrera
        self.kmCarrera = kmCarrera
        self.promedioTiempos = 0.0
        self.ganadorCarrera = 0
        self.competidores = []
        self.podioCarrera = []


    def promedio(self):
        for atleta in self.competidores:
            self.promedioTiempos += atleta.tiempoRealizado
        self.promedioTiempos /= len(self.competidores) 

    def ganador(self):
        menorT = self.competidores[0]
        for i in self.competidores:
            if i.tiempoRealizado < menorT.tiempoRealizado:
                menorT = i
        self.ganadorCarrera = menorT

    def podio(self):
        self.podioCarrera.append(self.ganadorCarrera)
        self.competidores.sort(key=lambda atleta: atleta.tiempoRealizado)
        self.podioCarrera.append(self.competidores[1])
        self.podioCarrera.append(self.competidores[2])

                                            