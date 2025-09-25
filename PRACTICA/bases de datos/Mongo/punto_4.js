
/*
1. Crear un archivo datos.json con al menos 8 productos adicionales.
2. Escribir un script importar.js que lea el archivo y lo inserte en la colección con:

var datos = cat('/ruta/datos.json');
var productos = JSON.parse(datos);
db.productos.insertMany(productos);
print('Datos importados correctamente');

Resultado esperado: Productos cargados desde archivo externo.
*/

use("Tienda")

// Leer archivo JSON y parsearlo
const fs = require('fs');
const datos = fs.readFileSync('datos.json', 'utf8');
const productos = JSON.parse(datos);

// Insertar en la colección
db.Productos.insertMany(productos);

print('Datos importados correctamente');
