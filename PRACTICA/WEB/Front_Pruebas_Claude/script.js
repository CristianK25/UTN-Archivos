// ============================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ============================================

// URL base del backend (cambiar por la URL real)
const API_BASE_URL = 'http://localhost:8080/api';

// Configuración de headers para las peticiones
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

// Variables globales
let currentUser = null;
let cart = [];
let featuredProducts = [];
let promotions = [];

// ============================================
// FUNCIONES DE API - ENDPOINTS DEL BACKEND
// ============================================

/**
 * PRODUCTOS - Endpoints para gestión de productos
 */

// Obtener productos destacados para la página principal
async function getFeaturedProducts() {
    try {
        /* 
        ENDPOINT: GET /api/productos/destacados
        Descripción: Obtiene los productos marcados como destacados
        Respuesta esperada: Array de objetos producto
        Ejemplo de estructura:
        [
            {
                id: 1,
                nombre: "RTX 4080 Gaming",
                precio: 850000,
                imagen: "url_imagen",
                descripcion: "Tarjeta gráfica gaming",
                categoria: "GPU",
                stock: 5,
                destacado: true
            }
        ]
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/productos/destacados`, {
        //     method: 'GET',
        //     headers: API_HEADERS
        // });
        // const products = await response.json();
        
        // DATOS DE PRUEBA (eliminar cuando conectes el backend)
        const products = [
            {
                id: 1,
                nombre: "RTX 4080 Gaming RGB",
                precio: 850000,
                imagen: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=RTX+4080",
                descripcion: "Tarjeta gráfica de última generación",
                categoria: "GPU"
            },
            {
                id: 2,
                nombre: "Ryzen 9 7900X",
                precio: 420000,
                imagen: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Ryzen+9",
                descripcion: "Procesador gaming de alto rendimiento",
                categoria: "CPU"
            },
            {
                id: 3,
                nombre: "RAM Corsair 32GB RGB",
                precio: 180000,
                imagen: "https://via.placeholder.com/300x200/A78BFA/FFFFFF?text=RAM+32GB",
                descripcion: "Memoria RAM DDR5 con iluminación RGB",
                categoria: "RAM"
            },
            {
                id: 4,
                nombre: "SSD NVMe 1TB",
                precio: 95000,
                imagen: "https://via.placeholder.com/300x200/67E8F9/000000?text=SSD+1TB",
                descripcion: "Almacenamiento SSD ultra rápido",
                categoria: "Storage"
            }
        ];
        
        return products;
    } catch (error) {
        console.error('Error al obtener productos destacados:', error);
        return [];
    }
}

// Obtener todas las promociones activas
async function getActivePromotions() {
    try {
        /* 
        ENDPOINT: GET /api/promociones/activas
        Descripción: Obtiene todas las promociones activas
        Respuesta esperada: Array de objetos promoción
        Ejemplo de estructura:
        [
            {
                id: 1,
                titulo: "Black Friday Tech",
                descripcion: "Hasta 50% de descuento",
                descuento: 50,
                fechaInicio: "2025-11-24",
                fechaFin: "2025-11-30",
                imagen: "url_imagen",
                activa: true
            }
        ]
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/promociones/activas`, {
        //     method: 'GET',
        //     headers: API_HEADERS
        // });
        // const promotions = await response.json();
        
        // DATOS DE PRUEBA (eliminar cuando conectes el backend)
        const promotions = [
            {
                id: 1,
                titulo: "Cyber Monday RGB",
                descripcion: "Hasta 40% OFF en componentes gaming",
                descuento: 40
            },
            {
                id: 2,
                titulo: "Pack Gaming Completo",
                descripcion: "Arma tu PC gaming y ahorra $150,000",
                descuento: 150000
            },
            {
                id: 3,
                titulo: "Envío Gratis",
                descripcion: "En compras mayores a $200,000",
                descuento: 0
            }
        ];
        
        return promotions;
    } catch (error) {
        console.error('Error al obtener promociones:', error);
        return [];
    }
}

// Buscar productos por nombre o categoría
async function searchProducts(query) {
    try {
        /* 
        ENDPOINT: GET /api/productos/buscar?q={query}
        Descripción: Busca productos por nombre, descripción o categoría
        Parámetros: q (string) - término de búsqueda
        Respuesta esperada: Array de objetos producto que coincidan con la búsqueda
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/productos/buscar?q=${encodeURIComponent(query)}`, {
        //     method: 'GET',
        //     headers: API_HEADERS
        // });
        // const results = await response.json();
        
        console.log(`Buscando productos con término: ${query}`);
        // Implementar lógica de búsqueda cuando conectes el backend
        
    } catch (error) {
        console.error('Error en búsqueda de productos:', error);
        return [];
    }
}

/**
 * AUTENTICACIÓN - Endpoints para login/registro
 */

// Iniciar sesión de usuario
async function loginUser(credentials) {
    try {
        /* 
        ENDPOINT: POST /api/auth/login
        Descripción: Autentica un usuario con email/username y contraseña
        Body: {
            username: string,
            password: string
        }
        Respuesta esperada: {
            token: string,
            user: {
                id: number,
                username: string,
                email: string,
                nombre: string,
                rol: string
            }
        }
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: API_HEADERS,
        //     body: JSON.stringify(credentials)
        // });
        // 
        // if (!response.ok) {
        //     throw new Error('Credenciales inválidas');
        // }
        // 
        // const userData = await response.json();
        // 
        // // Guardar token en localStorage o sessionStorage
        // localStorage.setItem('authToken', userData.token);
        // localStorage.setItem('currentUser', JSON.stringify(userData.user));
        // 
        // return userData;
        
        // SIMULACIÓN DE LOGIN (eliminar cuando conectes el backend)
        console.log('Intentando login con:', credentials);
        
        // Simular validación exitosa
        const mockUser = {
            id: 1,
            username: credentials.username,
            email: `${credentials.username}@example.com`,
            nombre: `Usuario ${credentials.username}`,
            rol: 'CLIENTE'
        };
        
        currentUser = mockUser;
        updateUIAfterLogin(mockUser);
        return { user: mockUser, token: 'mock-jwt-token' };
        
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
}

// Cerrar sesión de usuario
function logoutUser() {
    try {
        /* 
        ENDPOINT: POST /api/auth/logout (opcional)
        Descripción: Invalida el token del usuario (si tu backend lo requiere)
        Headers: Authorization: Bearer {token}
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL SI ES NECESARIO:
        // const token = localStorage.getItem('authToken');
        // const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        //     method: 'POST',
        //     headers: {
        //         ...API_HEADERS,
        //         'Authorization': `Bearer ${token}`
        //     }
        // });
        
        // Limpiar datos locales
        currentUser = null;
        cart = [];
        // localStorage.removeItem('authToken');
        // localStorage.removeItem('currentUser');
        
        updateUIAfterLogout();
        
    } catch (error) {
        console.error('Error en logout:', error);
    }
}

/**
 * CARRITO DE COMPRAS - Endpoints para gestión del carrito
 */

// Agregar producto al carrito
async function addToCart(productId, quantity = 1) {
    try {
        /* 
        ENDPOINT: POST /api/carrito/agregar
        Descripción: Agrega un producto al carrito del usuario
        Headers: Authorization: Bearer {token}
        Body: {
            productoId: number,
            cantidad: number
        }
        Respuesta esperada: {
            message: string,
            carrito: {
                items: Array,
                total: number
            }
        }
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const token = localStorage.getItem('authToken');
        // const response = await fetch(`${API_BASE_URL}/carrito/agregar`, {
        //     method: 'POST',
        //     headers: {
        //         ...API_HEADERS,
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify({
        //         productoId: productId,
        //         cantidad: quantity
        //     })
        // });
        // const result = await response.json();
        
        // SIMULACIÓN (eliminar cuando conectes el backend)
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: productId,
                quantity: quantity
            });
        }
        
        updateCartUI();
        showNotification('Producto agregado al carrito', 'success');
        
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        showNotification('Error al agregar al carrito', 'error');
    }
}

// ============================================
// EVENTOS Y FUNCIONALIDAD DE LA UI
// ============================================

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadInitialData();
});

// Configurar todos los event listeners
function setupEventListeners() {
    // Modal de login
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    
    if (loginBtn && loginModal && closeModal && loginForm) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
        
        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
        
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
        
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Barra de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Botón hero para explorar productos
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            window.location.href = 'productos.html';
        });
    }
}

// Manejar envío del formulario de login
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    try {
        const submitBtn = e.target.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ingresando...';
        
        await loginUser({ username, password });
        
        // Cerrar modal
        document.getElementById('loginModal').classList.remove('active');
        
        showNotification(`¡Bienvenido, ${username}!`, 'success');
        
    } catch (error) {
        showNotification('Error al iniciar sesión. Verifica tus credenciales.', 'error');
    } finally {
        const submitBtn = e.target.querySelector('.submit-btn');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Ingresar</span><i class="fas fa-sign-in-alt"></i>';
    }
}

// Manejar búsqueda de productos
async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query.length < 2) {
        showNotification('Ingresa al menos 2 caracteres para buscar', 'warning');
        return;
    }
    
    try {
        await searchProducts(query);
        // Redirigir a página de productos con filtro de búsqueda
        window.location.href = `productos.html?search=${encodeURIComponent(query)}`;
    } catch (error) {
        showNotification('Error al realizar la búsqueda', 'error');
    }
}

// Cargar datos iniciales de la página
async function loadInitialData() {
    try {
        // Cargar productos destacados
        const products = await getFeaturedProducts();
        displayFeaturedProducts(products);
        
        // Cargar promociones
        const promos = await getActivePromotions();
        displayPromotions(promos);
        
    } catch (error) {
        console.error('Error cargando datos iniciales:', error);
    }
}

// Mostrar productos destacados en la UI
function displayFeaturedProducts(products) {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Crear card de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
        </div>
        <div class="product-info">
            <h3>${product.nombre}</h3>
            <div class="product-price">${product.precio.toLocaleString()}</div>
            <button class="product-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i>
                Agregar al carrito
            </button>
        </div>
    `;
    
    return card;
}

// Mostrar promociones en la UI
function displayPromotions(promotions) {
    const container = document.getElementById('promotionsCarousel');
    if (!container) return;
    
    container.innerHTML = '';
    
    promotions.forEach(promo => {
        const promoCard = document.createElement('div');
        promoCard.className = 'promotion-card';
        promoCard.innerHTML = `
            <h3 class="promotion-title">${promo.titulo}</h3>
            <p class="promotion-description">${promo.descripcion}</p>
            <button class="promotion-btn">
                <i class="fas fa-tags"></i>
                Ver oferta
            </button>
        `;
        
        container.appendChild(promoCard);
    });
}

// Actualizar UI después del login
function updateUIAfterLogin(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${user.nombre}</span>
        `;
        loginBtn.onclick = () => {
            // Mostrar menú de usuario o redirigir al perfil
            console.log('Mostrar menú de usuario');
        };
    }
}

// Actualizar UI después del logout
function updateUIAfterLogout() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>Iniciar Sesión</span>
        `;
        loginBtn.onclick = () => {
            document.getElementById('loginModal').classList.add('active');
        };
    }
    
    updateCartUI();
}

// Actualizar contador del carrito en la UI
function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Inicializar la página
function initializePage() {
    // Verificar si hay usuario logueado (si usas localStorage)
    // const savedUser = localStorage.getItem('currentUser');
    // if (savedUser) {
    //     currentUser = JSON.parse(savedUser);
    //     updateUIAfterLogin(currentUser);
    // }
    
    console.log('Página inicializada correctamente');
}

// ============================================
// UTILIDADES Y FUNCIONES AUXILIARES
// ============================================

// Mostrar notificaciones al usuario
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Estilos según el tipo
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #EF4444, #F87171)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #F59E0B, #FBBF24)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #8B5CF6, #A78BFA)';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span style="margin-left: 0.5rem;">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

// Agregar animaciones CSS para las notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);