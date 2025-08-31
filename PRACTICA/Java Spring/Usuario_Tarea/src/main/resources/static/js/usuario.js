// Función para cargar todos los usuarios
async function cargarUsuarios() {
    try {
        const response = await fetch("http://localhost:8080/usuario/listar");
        const usuarios = await response.json();

        const tbody = document.querySelector("#tablaUsuarios tbody");
        tbody.innerHTML = ""; // Limpiar tabla

        usuarios.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.contrasenia}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
}

// Función para guardar un usuario
async function guardarUsuario(event) {
    event.preventDefault();

    const usuario = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        contrasenia: document.getElementById("contrasenia").value
    };

    try {
        const response = await fetch("http://localhost:8080/usuario/guardarUsuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        const data = await response.json();
        console.log("Usuario guardado:", data);
        alert("Usuario guardado correctamente ✅");
        // Limpiar formulario
        document.getElementById("formUsuario").reset();
        // Refrescar tabla
        cargarUsuarios();
    } catch (error) {
        console.error("Error al guardar usuario:", error);
        alert("Error al guardar usuario ❌");
    }
}

// 🔹 Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formUsuario").addEventListener("submit", guardarUsuario);
    document.getElementById("btnMostrarUsuario").addEventListener("click", cargarUsuarios);
});
