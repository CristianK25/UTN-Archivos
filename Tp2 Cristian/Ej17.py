import Ej17e
from num2words import num2words

class FuncionesPrograma:       
    @staticmethod
    def getFechaString(dia,mes,año):
        dia = FuncionesPrograma.validarDia(dia,mes)
        mes = FuncionesPrograma.validarMes(mes)
        año = FuncionesPrograma.validarAño(año)
        if (dia & mes & año)!= False:
            FuncionesPrograma.mostrarFecha(dia,mes,año)
        else:
            print("Fecha invalida")


    def mostrarFecha(dia,mes,año):
        StringDia = Ej17e.dias[dia]
        StringMes = Ej17e.meses[mes]
        StringAño = FuncionesPrograma.miles(año)
        print(f"{StringDia} de {StringMes} de {StringAño}")

    def miles(año):
        año_en_palabras = num2words(año,lang='es')
        return año_en_palabras


    def validarDia(dia,mes):
        match mes:
            case 2:
                if (dia>= 1 and dia<=29):
                    return dia
            case 4 | 6 | 9 | 11:
                if(0 <= dia <= 30):
                    return dia
            case 1 | 3 | 5 | 7 | 8 | 10 | 12:
                if (0 <= dia <= 31):
                    return dia
            case _:
                return False
            
    def validarMes(mes):
        if(mes>=1 and mes<=12):
            return mes
        else:
            return False
    
    def validarAño(año):
        if (año>=0):
            return año
        else:
            return False
    



def main():
    fechaRecibida = input("Ingrese una fecha con este formato 00/00/0000: ")
    listaDiaMesAño = fechaRecibida.split("/")
    dia = int(listaDiaMesAño[0])
    mes = int(listaDiaMesAño[1])
    año = int(listaDiaMesAño[2])
    FuncionesPrograma.getFechaString(dia, mes, año)



if __name__ == "__main__":
    main()