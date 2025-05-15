CREATE TABLE vuelos (
    fecha_vuelo DATE,
    aerolinea VARCHAR(100),
    origen CHAR(3),
    destino CHAR(3),
    cancelado BOOLEAN,
    desviado BOOLEAN,
    hora_salida INT,
    retraso_salida INT,
    hora_llegada INT,
    retraso_llegada INT,
    tiempo_de_vuelo FLOAT,
    distancia_recorrida FLOAT,
    id_local_aeropuerto_de_origen INT,
    ciudad_origen VARCHAR(100),
    siglas_estado_origen CHAR(2),
    id_estado_origen INT,
    estado_origen VARCHAR(100),
    id_global_aeropuerto_origen INT,
    id_local_aeropuerto_destino INT,
    ciudad_destino VARCHAR(100),
    siglas_estado_destino CHAR(2),
    id_estado_destino INT,
    estado_destino VARCHAR(100),
    id_global_aeropuerto_destino INT
);

DESCRIBE vuelos;
#Esta sentencia enumera todas las culumnas de la tabla, describe su tipo, si permite null, si hay alguna Key
#si tiene valores por default, algun añadido extra.

#4) Escribir una query que devuelva todos los registros de vuelos que han sido cancelados.
SELECT * FROM vuelos v WHERE v.cancelado = 1;

#5) Escribir una query que devuelva todos los registros de vuelos que partieron de Alabama.
SELECT * FROM vuelos WHERE estado_origen = 'Alabama';

#6) Escribir una query que devuelva todos registros de los vuelos que partieron de Alabama y han sido
#cancelados.
SELECT * FROM vuelos WHERE estado_origen = 'Alabama' AND cancelado = 1;

#7) Escribir una query que devuelva todos registros de los vuelos cuyo nombre de estado de origen
#comienza con “Ma”.
SELECT * FROM vuelos WHERE estado_origen LIKE 'Ma%';

#8) Escribir una query que devuelva todos los nombres de los estados de origen ordenados de manera
#alfabética. No deben haber estados duplicados, es decir, cada estado debe aparecer una única vez.
#Ayuda: para evitar registros repetidos puedes usar SELECT DISTINCT.
SELECT DISTINCT estado_origen FROM vuelos ORDER BY estado_origen;

#9) Escribir una query que cuente la cantidad de registros que tiene la tabla y coloque el resultado en
#un campo llamado cantidad_vuelos.
SELECT COUNT(*) AS cantidad_vuelos FROM vuelos;

#10) Escribir una query que cuente la cantidad de registros de vuelos cancelados que tiene la tabla y
#coloque el resultado en un campo llamado cantidad_vuelos_cancelados.
SELECT COUNT(*) AS cantidad_vuelos_cancelados FROM vuelos WHERE cancelado = 1;

#11) Escribir una query que sume la distancia total de todos los vuelos presentes en la tabla. Usar el
#campo distancia_recorrida para tal fin y colocar el resultado en un campo llamado distancia_total.
SELECT SUM(distancia_recorrida) AS distancia_total FROM vuelos;

#12) Escribir una query que calcule el promedio de distancia recorrida por todos los vuelos presentes
#en la tabla. Usar el campo distancia_recorrida para tal fin y colocar el resultado en un campo llamado
#distancia_promedio.
SELECT AVG(distancia_recorrida ) AS distancia_promedio FROM vuelos;

#13) Escribir una query que calcule el mínimo y el máximo de distancia recorrida por todos los vuelos
#presentes en la tabla. Usar el campo distancia_recorrida para tal fin y colocar los resultados en dos
#campos llamados distancia_minima y distancia_maxima, respectivamente.
SELECT MIN(distancia_recorrida) AS distancia_minima, MAX(distancia_recorrida) AS distancia_maxima FROM vuelos;

#14) Escribir queries que respondan las siguientes preguntas:
#a) ¿Cuántos vuelos salieron de Texas y llegaron a Colorado?
SELECT COUNT(*) AS De_Texas_A_Colorado FROM vuelos WHERE estado_origen = 'Texas' AND estado_destino = 'Colorado'; 

##b) ¿Cuántos vuelos fueron cancelados?
SELECT COUNT(*) AS cantidad_vuelos_cancelados FROM vuelos WHERE cancelado = 1;

#c) ¿Cuál es el tiempo de retraso promedio en las salidas? ¿Y en las llegadas?
SELECT AVG(retraso_salida) AS Prom_Retraso_Salida, AVG(retraso_llegada) AS Prom_Retraso_Llegada FROM vuelos;

#d) ¿Cuál es la velocidad promedio de los vuelos?
SELECT AVG(distancia_recorrida / tiempo_de_vuelo) AS Velocidad_Promedio_Vuelos FROM vuelos WHERE tiempo_de_vuelo > 0;
#Resultado en millas/minuto

#e) ¿Cuáles son las 10 rutas más largas? ¿Y las 10 más cortas? Basarse en la distancia
#recorrida. Imprimir por pantalla los campos origen, destino y distancia_recorrida
SELECT origen, destino, distancia_recorrida
FROM vuelos
WHERE distancia_recorrida > 0
ORDER BY distancia_recorrida DESC
LIMIT 10;

SELECT origen, destino, distancia_recorrida
FROM vuelos
WHERE distancia_recorrida > 0
ORDER BY distancia_recorrida ASC
LIMIT 10;

#Mismo ejercicio pero con rutas unicas (no repetidas)
SELECT DISTINCT origen, destino, MAX(distancia_recorrida)
FROM vuelos
WHERE distancia_recorrida > 0
ORDER BY distancia_recorrida DESC
LIMIT 10;

SELECT DISTINCT origen, destino, MAX(distancia_recorrida) AS Distancia_Maxima
FROM vuelos
WHERE distancia_recorrida > 0
ORDER BY distancia_recorrida ASC
LIMIT 10;