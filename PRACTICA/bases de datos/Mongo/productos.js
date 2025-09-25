// productos.js

// Seleccionar la base de datos
use("Tienda")

// Insertar múltiples productos en la colección "Productos"
db.Productos.insertMany([
  { nombre: "Laptop Lenovo", categoria: "Tecnología", precio: 850 },
  { nombre: "Celular Samsung", categoria: "Tecnología", precio: 600 },
  { nombre: "Silla de Oficina", categoria: "Muebles", precio: 120 },
  { nombre: "Mesa de Madera", categoria: "Muebles", precio: 250 },
  { nombre: "Cafetera Philips", categoria: "Electrodomésticos", precio: 90 },
  { nombre: "Heladera LG", categoria: "Electrodomésticos", precio: 1200 },
  { nombre: "Zapatillas Nike", categoria: "Ropa", precio: 80 },
  { nombre: "Campera Adidas", categoria: "Ropa", precio: 150 },
  { nombre: "Cocina Longvie", categoria: "Electrodomésticos", precio: 700 },
  { nombre: "Libro: MongoDB Básico", categoria: "Libros", precio: 35 }
])

print("10 productos insertados correctamente en la colección 'Productos'")
