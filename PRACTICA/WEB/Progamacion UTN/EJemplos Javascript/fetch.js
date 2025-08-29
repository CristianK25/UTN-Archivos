boton1 = document.getElementById('boton1');
boton1.addEventListener('click', cargarDatos);

function cargarDatos() {
    fetch('info.json').
        then(response => response.json())
        .then(data => console.log(data.Persona.nombre)
    );
}