/*
1. Escribir un script reporte.js que:
- Calcule el precio promedio de todos los productos.
- Liste los productos que estén por encima de ese promedio.
- Muestre un conteo final: 'Total productos por encima del promedio: X'.

Resultado esperado: Reporte en consola con listado + conteo.
*/

use("Tienda")
// Calcular el precio promedio de todos los productos
const promedio = db.Productos.aggregate([
  {
    $group: {
        _id: null,
        precioPromedio: { $avg: "$precio" }
    }
  }
]).toArray()[0].precioPromedio;
print('Precio promedio:', promedio);
// Listar productos por encima del promedio
const productosPorEncima = db.Productos.find({ precio: { $gt: promedio } }).toArray();
productosPorEncima.forEach(producto => printjson(producto));
// Mostrar conteo final
print('Total productos por encima del promedio:', productosPorEncima.length);
