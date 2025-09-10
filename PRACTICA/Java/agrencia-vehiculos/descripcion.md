# Ejercicio: Gestión de Vehículos de Alquiler

## Contexto
Una empresa de alquiler de vehículos necesita un sistema para gestionar su flota y los contratos de alquiler que realiza con sus clientes.  
El objetivo es modelar este sistema aplicando **herencia**, **polimorfismo**, **interfaces** y **organización en paquetes**.

---

## Descripción del dominio

- **Vehículos**:  
  Existe una clase abstracta `Vehiculo` que define atributos comunes (`patente`, `modelo`) y un método abstracto `mover()` que cada subclase debe implementar.  
  Se modelan tres tipos de vehículos:
    - `Auto`: atributos propios `cantidadPuertas` y `tipoCombustible`.
    - `Moto`: atributo propio `cilindrada`.
    - `Barco`: atributos propios `esDeportiva` y `eslora`.

- **Capacidades (Interfaces)**:  
  Algunas capacidades son comunes a varios vehículos, por lo que se definen como interfaces:
    - `Conducible` → `conducir()`  
      (Implementada por Auto y Moto)
    - `Navegable` → `navegar()`  
      (Implementada por Barco)
    - `Asegurable` → `asegurar()`  
      (Implementada por todos los vehículos)

- **Clientes**:  
  Clase `Cliente` con datos básicos `nombre` y `dni`.

- **Agencia**:  
  Clase `Agencia` que administra una lista de vehículos (`List<Vehiculo>`), con métodos para agregar y listar la flota.

- **Contratos de Alquiler**:  
  Clase `ContratoAlquiler` que vincula un cliente con un vehículo, indicando:
    - `fechaInicio`, `días`, `precioPorDia`.
    - Método `total()` para calcular el monto total.
    - Implementa la interfaz `Pagable` con `pagar(double monto)`, que valida el pago y calcula vuelto si corresponde.

---

## Objetivos didácticos

- Aplicar **herencia** para reutilizar atributos y métodos comunes en una clase abstracta.
- Demostrar **polimorfismo** invocando `mover()` desde una colección `List<Vehiculo>` con diferentes tipos concretos.
- Usar **interfaces** para modelar capacidades transversales (`Conducible`, `Navegable`, `Asegurable`, `Pagable`).
- Practicar **paquetización** separando el código en:
    - `vehiculos` → clases de vehículos
    - `capacidades` → interfaces
    - `personas` → clientes
    - `contratos` → contratos de alquiler
    - `agencia` → clase `Agencia`

---

## Tareas a realizar

1. Crear una instancia de `Agencia` y agregar al menos un **Auto**, una **Moto** y un **Barco** con datos realistas.
2. Recorrer la flota con un bucle e invocar `mover()` para comprobar **polimorfismo**.
3. Usar `instanceof` para invocar los métodos de las interfaces (`conducir()`, `navegar()`, `asegurar()`).
4. Crear un cliente (`Cliente`) y generar un `ContratoAlquiler` para uno de los vehículos.
5. Llamar a `pagar()` dos veces:
    - una con monto insuficiente,
    - otra con monto correcto para mostrar el cambio de estado (`pagado = true`).
6. Imprimir los objetos (`Agencia`, `Vehiculo`, `ContratoAlquiler`) para verificar que los métodos `toString()` muestran información clara.

---