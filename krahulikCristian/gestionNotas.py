from metodos import numeroPositivoEntero
alumnos = {
    "60902": "Rodolfo Fernandez", 
    "61654": "Luis Gomez ",
    "61852": "Andrea Pereira" ,
    "61754": "Juan Cruz Gonzales" 
}

materias = [
    ["Ciencias",0,0,0],
    ["Historia",0,0,0],
    ["Geografia",0,0,0],
    ["Matematicas",0,0,0],
    ["Fisica",0,0,0]
]

notasFinales = [
    ["Rodolfo Fernandez",0],
    ["Luis Gomez ",0],
    ["Andrea Pereira",0],
    ["Juan Cruz Gonzales",0]
]

promedios = []

def main():
    ingresarNotas()
    mostrarNotasAlumnos()
    alumnoMejorPromedio()

def ingresarNotas():
    indices = 0
    for alumno in alumnos:
        print(f"\nAlumno {alumnos[alumno]}")
        for i in range(5):
            nota1, nota2 = validarNota(i)
            materias[i][1] += nota1
            materias[i][2] += nota2
            materias[i][3] = (nota1 + nota2)/2
            indices = i
        mostrarNotas()
        nombreAlumno = alumnos[alumno]
        materiaMasAlta(nombreAlumno)
        promedioAlumno = calcularPromedio()
        promedios.append(promedioAlumno)
        llenarNotaFinal(promedioAlumno,indices)
        
def materiaMasAlta(nombreAlumno):
    mayor = 0
    indice = 0
    for i in range(len(materias)):
        if (materias[i][3] > mayor):
            mayor = materias[i][3]
            indice = i
    print(f"La materia con nota mas alta para {nombreAlumno} es: {materias[indice][0]} con {mayor}")

def alumnoMejorPromedio():
    mayor = -1
    indiceMayor = 0
    for i in range(len(promedios)):
        if (mayor <= promedios[i]):
            mayor = promedios[i]
            indiceMayor = i
    print(f"El alumno con mejor promedio es {notasFinales[indiceMayor][0]}")

def llenarNotaFinal(promedioAlumno,i):
    notasFinales[i][1] = promedioAlumno
    

def validarNota(i):
    while True:
        nota1 = numeroPositivoEntero(f"Ingrese la nota 1({materias[i][0]}): ")
        nota2 = numeroPositivoEntero(f"Ingrese la nota 2: ")
        if (nota1 >= 0 and nota1<=10) and (nota2 <= 10 and nota2 >= 0):
            return (nota1,nota2)


def calcularPromedio():
    suma = 0
    for materia in materias:
        suma += materia[3]
    return suma/ len(materias)

def mostrarNotas():
    for i in range(5):
        print(f"{materias[i][0]}:\n\t-Nota 1: {materias[i][1]}\n\t-Nota 2: {materias[i][2]}\n\t-Nota Final: {materias[i][3]}")

def mostrarNotasAlumnos():
    print("\n Notas Finales de alumnos")
    for nota in notasFinales:
        print(nota)



if __name__ == "__main__":
    main()