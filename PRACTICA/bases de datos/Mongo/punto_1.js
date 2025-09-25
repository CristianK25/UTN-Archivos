/*
1. Crear un script productos.js que:
- Inserte 15 productos, distribuidos en al menos 5 categorías distintas.
- Aumente el precio un 15% a los productos de la categoría 'Tecnología'.
- Disminuya un 5% a los productos de la categoría 'Muebles'.
- Imprima en consola cuántos documentos fueron modificados en cada categoría.

Resultado esperado: Script ejecutado con inserciones y actualizaciones condicionales.
*/

for (let i = 1; i <= 15; i++) {
  db.Productos.insertOne({
    nombre: `Producto ${i}`,
    categoria: i % 5 === 0 ? "Tecnología" : i % 5 === 1 ? "Muebles" : i % 5 === 2 ? "Ropa" : i % 5 === 3 ? "Electrodomésticos" : "Libros",
    precio: Math.floor(Math.random() * 1000) + 50 // Precio aleatorio entre 50 y 1050
  });
}

// Aumentar el precio un 15% a los productos de la categoría 'Tecnología'
let resultTech = db.Productos.updateMany(
  { categoria: "Tecnología" },
  { $mul: { precio: 1.15 } }
);
print(`${resultTech.modifiedCount} productos de la categoría 'Tecnología' fueron actualizados. Aumento aplicado.`);

// Disminuir un 5% a los productos de la categoría 'Muebles'
let resultFurniture = db.Productos.updateMany(
  { categoria: "Muebles" },
  { $mul: { precio: 0.95 } }
);
print(`${resultFurniture.modifiedCount} productos de la categoría 'Muebles' fueron actualizados. Disminución aplicada.`);

print("Script ejecutado con inserciones y actualizaciones condicionales.");
