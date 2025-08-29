var unNumero =5;
var otroNumero = 10;
if (unNumero ===5) {
    let unNumero =4; // El alcance es dentro del bloque if

    var otroNumero =1; // El alcance es global

    console.log(unNumero ); // 4
    console.log(otroNumero ); // 1
}
console.log(unNumero ); // 5
console.log(otroNumero ); // 1