Algoritmo ejerciciof
	Definir Gimenez como Entero
	Definir Gonzalez como Entero
	Definir sumaGim Como Entero
	Definir sumaGon Como Entero
	Definir i Como Entero
	Definir consejo1 como Cadena
	Definir consejo2 como Cadena
	Definir consejo3 como Cadena
	consejo1 = "Que la familia que tiene primero las vacaciones las atrase (cualitativa, continua) "
	consejo2 = "Que la familia que tiene las vacaciones luego vea la posibilidad de adelantarlas (cualitativa, continua) "
	consejo3 = "Que identifiquen prioridades y vean q vale más la pena, si tomar la decisión de q no vayan juntos de vacaciones y dejarlo para el otro año o tomar acciones en el menor tiempo posible (cualitativa, discreta)"
	
	Dimension Gimenez[5]
	Dimension Gonzalez[6]
	
	sumaGim = 0
	sumaGon = 0
	Escribir "Ingrese las edades de la familia Gimenez"
	Para i=0 Hasta 4 Hacer
		leer Gimenez[i]
		sumaGim = sumaGim + Gimenez[i]
	FinPara
	Escribir "Ingrese las edades de la familia Gonzalez"
	Para i=0 Hasta 5 Hacer
		leer Gonzalez[i]
		sumaGon = sumaGon + Gonzalez[i]
	FinPara
	
	Si sumaGim > sumaGon Entonces
		Escribir "La familia Gimenez toma las desiciones"
	SiNo
		Escribir "La familia Gonzalez toma las desiciones"
	FinSi
	
	
FinAlgoritmo
