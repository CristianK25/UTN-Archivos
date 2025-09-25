/*
1. Crear un script validaciones.js que:
- Recorra todos los productos con un forEach.
- Verifique si algún producto tiene precio menor o igual a 0.
- Si encuentra errores, los muestre en consola con un mensaje:
  'Error: producto [nombre] tiene precio inválido'.
- Si no encuentra errores, muestre 'Todos los productos son válidos'.

Resultado esperado: Output mostrando validaciones correctas o incorrectas.
*/

// Seleccionar la base de datos
use("Tienda")

// Inicializar bandera para controlar si hay errores
let hayErrores = false

// Obtener todos los productos
let productos = db.Productos.find().toArray()

// Recorrer todos los productos y validar precio
productos.forEach(producto => {
    if (producto.precio <= 0) {
        print(`Error: producto ${producto.nombre} tiene precio inválido`)
        hayErrores = true
    }
})

// Mostrar mensaje final si no hubo errores
if (!hayErrores) {
    print("Todos los productos son válidos")
}

print("\nScript de validaciones ejecutado correctamente.")
