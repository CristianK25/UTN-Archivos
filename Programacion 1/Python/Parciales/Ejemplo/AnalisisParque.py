from Atraccion import Atraccion
from Sector import Sector
from Parque import Parque
from metodos import numeroPositivoEntero

class AnalisisParque:
    def __init__(self) -> None:
        self.catalogoAtracciones = [
            ["AAA" , "Juegos Infantiles"    ,   500   ,              200000 ],
            ["BBB" , "Zona de Picnic"       ,   800   ,              150000 ],
            ["CCC" , "Lago Artificial"      ,   2000 ,              1000000],
            ["DDD" , "Jardines Temáticos"   ,   1500 ,              600000 ],
            ["EEE" , "Circuito de Caminata" ,   3000 ,              800000],
            ["FFF" , "Zona Deportiva"       ,   2500 ,              900000],
            ["GGG" , "Espacio Cultural"     ,   1000 ,              500000]
        ]


    def main(self):
        nombreParque = input("Ingrese el nombre del parque: ")
        self.parque = Parque(nombreParque)
        cantidadSectores = self.validarCantidadSectores()
        self.ingresarSectores(cantidadSectores)
        self.mostrarInfo()
            
            
    #?MostrarInformacion
    def mostrarInfo(self):
        print("----------Parque Recreativo------------")
        print("Nombre: ",self.parque.nombre)
        print("Total Metros Construidos: ", self.parque.totalMetrosConstruidos())
        print("Total Metros Construidos: ", self.parque.totalCostoConstruccion())
        print("Costo Promedio por Metro Cuadrado: ",self.parque.totalMetrosConstruidos() / len(self.parque.lista_Sectores))
        print("----------Sectores--------------------")
        for sector in self.parque.lista_Sectores:
            print(f"\nNombre: {sector.nombreSector}")
            print("---Atracciones---")
            for atraccion in sector.lista_Atracciones:
                print(f"\n{atraccion.tipoAtraccion} {atraccion.metrosCuadrados}m^3")
                print(f"Costo Construccion: {atraccion.costoAtraccion}")
            print(f"Total Metros del sector : {sector.totalMetrosSector()}")
    
    
    #! INGRESO DE SECTORES
    def ingresarSectores(self,cantidadSectores):
        for i in range(cantidadSectores):
            self.sector = self.validarSectorUnico()
            self.ingresoAtracciones()
            self.parque.lista_Sectores.append(self.sector)



    #! INGRESO DE ATRACCIONES

    def ingresoAtracciones(self):
        cantidadAtracciones = self.validarCantidadAtracciones()
        while True:
            lista_temporal_atracciones = []
            totalMetros = 0
            for i in range(cantidadAtracciones):
                atraccion = self.validarCodigo()
                totalMetros += atraccion.metrosCuadrados
                lista_temporal_atracciones.append(atraccion)

            if len(set(lista_temporal_atracciones)) != len(lista_temporal_atracciones):
                print("Atracciones repetidas")
                continue
            if totalMetros >= 50000:
                print("Las atracciones no pueden exceder 50000")
                continue

            for atr in lista_temporal_atracciones:
                self.sector.lista_Atracciones.append(atr)
            break
            
                     

    #! Validaciones

    def validarCodigo(self) -> Atraccion:
        while True:
            codigo = input("Ingrese el codigo de la atraccion: ")
            for i in range(len(self.catalogoAtracciones)):
                if codigo == self.catalogoAtracciones[i][0]:
                    nombre = self.catalogoAtracciones[i][1]
                    metros = self.catalogoAtracciones[i][2]
                    costo = self.catalogoAtracciones[i][3]
                    return Atraccion(nombre,metros,costo)
            print("Ese codigo no existe. Intente de nuevo")
                    

    def validarCantidadAtracciones(self):
        while True:
            n = numeroPositivoEntero("Ingrese la cantidad de atracciones: ")
            if n > 2:
                return n
            else: 
                print("El sector debe tener mas de 2 atracciones")


    def validarSectorUnico(self):
        while True:
            nombreSector = input("Ingrese el nombre el sector: ")
            for i in range(len(self.parque.lista_Sectores)):
                if nombreSector == self.parque.lista_Sectores[i].nombreSector:
                    print("Ese sector ya existe")
                    continue    
            sector = Sector(nombreSector)
            return sector

    def validarCantidadSectores(self):
        while True:
            n = numeroPositivoEntero("Ingresa la cantidad de sectores del parque (2-8): ")
            if 2 <= n <= 8:
                return n
            else:
                print("El valor debe estar entre 2 y 8")



analisis = AnalisisParque()
analisis.main()