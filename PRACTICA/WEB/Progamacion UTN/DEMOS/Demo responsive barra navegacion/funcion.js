// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    function toggleMenu() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('active');
    }

    // Agregar event listener al botón
    const menuButton = document.querySelector('.nav-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    // Cerrar el menú cuando se hace clic en un enlace (opcional)
    document.querySelectorAll('.nav-enlace').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        });
    });

    // Cerrar el menú cuando la pantalla se hace más grande (opcional)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 600) {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }
    });
    
});