/*
1. Script consultas.js que:
- Liste productos con precio mayor al promedio general de la colección.
- Agrupe productos por categoría mostrando: nombre de categoría y total de productos.
- Ordene productos por precio descendente y muestre los 3 más caros.

Resultado esperado: Capturas de salida en consola.
*/



// consultas.js
// Actividad 2 – Consultas automatizadas

// Seleccionar la base de datos
use("Tienda")

// 1️⃣ Listar productos con precio mayor al promedio general de la colección
let precioPromedio = db.Productos.aggregate([
  { $group: { _id: null, precioPromedio: { $avg: "$precio" } } }
]).toArray()[0].precioPromedio;

print(`\nPrecio promedio general: ${precioPromedio}\n`);

let productosPorEncimaPromedio = db.Productos.find({ precio: { $gt: precioPromedio } }).toArray();

print("Productos con precio mayor al promedio:");
productosPorEncimaPromedio.forEach(producto => printjson(producto));

// 2️⃣ Agrupar productos por categoría mostrando nombre de categoría y total de productos
let productosAgrupadosPorCategoria = db.Productos.aggregate([
  { $group: { _id: "$categoria", totalProductos: { $sum: 1 } } }
]).toArray();

print("\nTotal de productos por categoría:");
productosAgrupadosPorCategoria.forEach(categoria => 
    print(`Categoría: ${categoria._id}, Total: ${categoria.totalProductos}`)
);

// 3️⃣ Ordenar productos por precio descendente y mostrar los 3 más caros
let top3ProductosMasCaros = db.Productos.find().sort({ precio: -1 }).limit(3).toArray();

print("\nLos 3 productos más caros:");
top3ProductosMasCaros.forEach(producto => printjson(producto));

print("\nScript de consultas ejecutado correctamente.");
