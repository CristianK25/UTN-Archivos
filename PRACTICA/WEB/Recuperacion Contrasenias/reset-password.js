const API_BASE = 'http://localhost:8080/auth';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');

    const forgotForm = document.getElementById('forgot-password-form');
    const resetForm = document.getElementById('reset-password-form');

    if (tokenFromURL) {
        // Mostrar formulario de reset y ocultar el de envío de mail
        forgotForm.style.display = 'none';
        resetForm.style.display = 'block';
        resetForm.dataset.token = tokenFromURL; // Guardamos token internamente
    } else {
        // Mostrar formulario de envío de mail y ocultar el de reset
        forgotForm.style.display = 'block';
        resetForm.style.display = 'none';
    }

    // Botón para enviar link de recuperación
    document.getElementById('send-link-btn').addEventListener('click', sendResetLink);

    // Botón para resetear contraseña
    document.getElementById('reset-password-btn').addEventListener('click', resetPassword);
});

// Función para enviar mail de recuperación
async function sendResetLink() {
    const email = document.getElementById('email').value;
    const messageEl = document.getElementById('forgot-message');
    messageEl.classList.remove('error');
    messageEl.textContent = '';

    try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const text = await response.text();
        messageEl.textContent = text;
    } catch (err) {
        messageEl.classList.add('error');
        messageEl.textContent = 'Error al enviar el link';
    }
}

// Función para restablecer contraseña usando el token
async function resetPassword() {
    const token = document.getElementById('reset-password-form').dataset.token;
    const newPassword = document.getElementById('new-password').value;
    const messageEl = document.getElementById('reset-message');
    messageEl.classList.remove('error');
    messageEl.textContent = '';

    if(!token){
        messageEl.classList.add('error');
        messageEl.textContent = 'Token inválido o no presente en la URL';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });

        const text = await response.text();
        messageEl.textContent = text;
    } catch (err) {
        messageEl.classList.add('error');
        messageEl.textContent = 'Error al actualizar la contraseña';
    }
}
