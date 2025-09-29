// ============================================
// CONFIGURACIÓN Y VARIABLES GLOBALES - PRODUCTOS
// ============================================

// URL base del backend (igual que en script.js)
const API_BASE_URL = 'http://localhost:8080/api';

// Configuración de headers para las peticiones
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

// Variables globales para la página de productos
let allProducts = [];
let filteredProducts = [];
let categories = [];
let brands = [];
let currentPage = 1;
let productsPerPage = 12;
let currentFilters = {
    category: '',
    brand: '',
    minPrice: null,
    maxPrice: null,
    inStock: false,
    search: ''
};
let currentSort = 'relevancia';
let currentView = 'grid';
let currentUser = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ============================================
// FUNCIONES DE API - ENDPOINTS DEL BACKEND
// ============================================

/**
 * PRODUCTOS - Endpoints para gestión de productos
 */

// Obtener todos los productos con paginación y filtros
async function getAllProducts(page = 1, limit = 12, filters = {}, sort = 'relevancia') {
    try {
        /* 
        ENDPOINT: GET /api/productos
        Descripción: Obtiene todos los productos con paginación y filtros
        Parámetros de consulta:
        - page: número de página (default: 1)
        - limit: productos por página (default: 12)
        - categoria: filtro por categoría
        - marca: filtro por marca
        - minPrice: precio mínimo
        - maxPrice: precio máximo
        - inStock: solo productos en stock (true/false)
        - search: término de búsqueda
        - sort: criterio de ordenamiento
        
        Respuesta esperada: {
            productos: Array,
            totalPages: number,
            currentPage: number,
            totalProducts: number
        }
        */
        
        // Construir query string con filtros
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort: sort
        });
        
        // Agregar filtros si existen
        if (filters.category) queryParams.append('categoria', filters.category);
        if (filters.brand) queryParams.append('marca', filters.brand);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
        if (filters.inStock) queryParams.append('inStock', 'true');
        if (filters.search) queryParams.append('search', filters.search);
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/productos?${queryParams}`, {
        //     method: 'GET',
        //     headers: API_HEADERS
        // });
        // const data = await response.json();
        // return data;
        
        // DATOS DE PRUEBA (eliminar cuando conectes el backend)
        const mockProducts = [
            {
                id: 1, nombre: "RTX 4080 Gaming RGB", precio: 850000,
                imagen: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=RTX+4080",
                descripcion: "Tarjeta gráfica de última generación con RGB",
                categoria: "GPU", marca: "NVIDIA", stock: 5, disponible: true
            },
            {
                id: 2, nombre: "Ryzen 9 7900X", precio: 420000,
                imagen: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Ryzen+9",
                descripcion: "Procesador gaming de alto rendimiento",
                categoria: "CPU", marca: "AMD", stock: 8, disponible: true
            },
            {
                id: 3, nombre: "RAM Corsair 32GB RGB", precio: 180000,
                imagen: "https://via.placeholder.com/300x200/A78BFA/FFFFFF?text=RAM+32GB",
                descripcion: "Memoria RAM DDR5 con iluminación RGB",
                categoria: "RAM", marca: "Corsair", stock: 12, disponible: true
            },
            {
                id: 4, nombre: "SSD Samsung 1TB NVMe", precio: 95000,
                imagen: "https://via.placeholder.com/300x200/67E8F9/000000?text=SSD+1TB",
                descripcion: "Almacenamiento SSD ultra rápido",
                categoria: "Storage", marca: "Samsung", stock: 15, disponible: true
            },
            {
                id: 5, nombre: "RTX 4070 Ti", precio: 650000,
                imagen: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=RTX+4070Ti",
                descripcion: "Excelente relación precio-rendimiento",
                categoria: "GPU", marca: "NVIDIA", stock: 3, disponible: true
            },
            {
                id: 6, nombre: "Intel i7-13700K", precio: 380000,
                imagen: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=i7+13700K",
                descripcion: "Procesador Intel de 13va generación",
                categoria: "CPU", marca: "Intel", stock: 6, disponible: true
            },
            {
                id: 7, nombre: "RAM G.Skill 16GB", precio: 95000,
                imagen: "https://via.placeholder.com/300x200/A78BFA/FFFFFF?text=RAM+16GB",
                descripcion: "Memoria RAM DDR4 de alto rendimiento",
                categoria: "RAM", marca: "G.Skill", stock: 20, disponible: true
            },
            {
                id: 8, nombre: "SSD WD 500GB", precio: 55000,
                imagen: "https://via.placeholder.com/300x200/67E8F9/000000?text=SSD+500GB",
                descripcion: "SSD confiable para uso general",
                categoria: "Storage", marca: "Western Digital", stock: 0, disponible: false
            }
        ];
        
        // Simular filtrado y paginación
        let filtered = mockProducts;
        
        // Aplicar filtros
        if (filters.category) {
            filtered = filtered.filter(p => p.categoria === filters.category);
        }
        if (filters.brand) {
            filtered = filtered.filter(p => p.marca === filters.brand);
        }
        if (filters.minPrice) {
            filtered = filtered.filter(p => p.precio >= filters.minPrice);
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.precio <= filters.maxPrice);
        }
        if (filters.inStock) {
            filtered = filtered.filter(p => p.disponible && p.stock > 0);
        }
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.nombre.toLowerCase().includes(searchTerm) ||
                p.descripcion.toLowerCase().includes(searchTerm)
            );
        }
        
        // Aplicar ordenamiento
        switch (sort) {
            case 'precio-asc':
                filtered.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio-desc':
                filtered.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre-asc':
                filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre-desc':
                filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                // Relevancia - sin cambios
                break;
        }
        
        // Simular paginación
        const totalProducts = filtered.length;
        const totalPages = Math.ceil(totalProducts / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filtered.slice(startIndex, endIndex);
        
        return {
            productos: paginatedProducts,
            totalPages: totalPages,
            currentPage: page,
            totalProducts: totalProducts
        };
        
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return {
            productos: [],
            totalPages: 0,
            currentPage: 1,
            totalProducts: 0
        };
    }
}

// Obtener producto por ID
async function getProductById(productId) {
    try {
        /* 
        ENDPOINT: GET /api/productos/{id}
        Descripción: Obtiene un producto específico por su ID
        Respuesta esperada: Objeto producto
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
        //     method: 'GET',
        //     headers: API_HEADERS
        // });
        // const product = await response.json();
        // return product;
        
        // DATOS DE PRUEBA - buscar en mockProducts
        const mockProducts = [
            { id: 1, nombre: "RTX 4080 Gaming RGB", precio: 850000, imagen: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=RTX+4080", descripcion: "Tarjeta gráfica de última generación con RGB", categoria: "GPU", marca: "NVIDIA", stock: 5, disponible: true },
            { id: 2, nombre: "Ryzen 9 7900X", precio: 420000, imagen: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Ryzen+9", descripcion: "Procesador gaming de alto rendimiento", categoria: "CPU", marca: "AMD", stock: 8, disponible: true },
            { id: 3, nombre: "RAM Corsair 32GB RGB", precio: 180000, imagen: "https://via.placeholder.com/300x200/A78BFA/FFFFFF?text=RAM+32GB", descripcion: "Memoria RAM DDR5 con iluminación RGB", categoria: "RAM", marca: "Corsair", stock: 12, disponible: true },
            { id: 4, nombre: "SSD Samsung 1TB NVMe", precio: 95000, imagen: "https://via.placeholder.com/300x200/67E8F9/000000?text=SSD+1TB", descripcion: "Almacenamiento SSD ultra rápido", categoria: "Storage", marca: "Samsung", stock: 15, disponible: true },
            { id: 5, nombre: "RTX 4070 Ti", precio: 650000, imagen: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=RTX+4070Ti", descripcion: "Excelente relación precio-rendimiento", categoria: "GPU", marca: "NVIDIA", stock: 3, disponible: true },
            { id: 6, nombre: "Intel i7-13700K", precio: 380000, imagen: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=i7+13700K", descripcion: "Procesador Intel de 13va generación", categoria: "CPU", marca: "Intel", stock: 6, disponible: true },
            { id: 7, nombre: "RAM G.Skill 16GB", precio: 95000, imagen: "https://via.placeholder.com/300x200/A78BFA/FFFFFF?text=RAM+16GB", descripcion: "Memoria RAM DDR4 de alto rendimiento", categoria: "RAM", marca: "G.Skill", stock: 20, disponible: true },
            { id: 8, nombre: "SSD WD 500GB", precio: 55000, imagen: "https://via.placeholder.com/300x200/67E8F9/000000?text=SSD+500GB", descripcion: "SSD confiable para uso general", categoria: "Storage", marca: "Western Digital", stock: 0, disponible: false }
        ];
        
        return mockProducts.find(p => p.id === parseInt(productId));
        
    } catch (error) {
        console.error('Error al obtener producto:', error);
        return null;
    }
}

// Obtener todas las categorías disponibles
async function getCategories() {
    try {
        /* 
        ENDPOINT: GET /api/categorias
        Descripción: Obtiene todas las categorías de productos
        Respuesta esperada: Array de strings o objetos categoría
        Ejemplo: ["CPU", "GPU", "RAM", "Storage", "Motherboard"]
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/categorias`, {
        //     method: 'GET',
        //     headers: API_HEADERS
        // });
        // const categories = await response.json();
        // return categories;
        
        // DATOS DE PRUEBA
        return ["CPU", "GPU", "RAM", "Storage", "Motherboard", "PSU", "Case"];
        
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return [];
    }
}

// Obtener todas las marcas disponibles
async function getBrands() {
    try {
        /* 
        ENDPOINT: GET /api/marcas
        Descripción: Obtiene todas las marcas de productos
        Respuesta esperada: Array de strings o objetos marca
        Ejemplo: ["NVIDIA", "AMD", "Intel", "Corsair", "Samsung"]
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const response = await fetch(`${API_BASE_URL}/marcas`, {
        //     method: 'GET',
        //     headers: API_HEADERS
        // });
        // const brands = await response.json();
        // return brands;
        
        // DATOS DE PRUEBA
        return ["NVIDIA", "AMD", "Intel", "Corsair", "Samsung", "G.Skill", "Western Digital", "ASUS", "MSI"];
        
    } catch (error) {
        console.error('Error al obtener marcas:', error);
        return [];
    }
}

/**
 * CARRITO - Funciones para gestión del carrito
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
        
        // Obtener información del producto
        const product = await getProductById(productId);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        
        if (!product.disponible || product.stock <= 0) {
            throw new Error('Producto no disponible');
        }
        
        // Verificar si ya existe en el carrito
        const existingItemIndex = cart.findIndex(item => item.product.id === productId);
        
        if (existingItemIndex !== -1) {
            // Si existe, aumentar cantidad
            const newQuantity = cart[existingItemIndex].quantity + quantity;
            if (newQuantity > product.stock) {
                throw new Error(`Solo hay ${product.stock} unidades disponibles`);
            }
            cart[existingItemIndex].quantity = newQuantity;
        } else {
            // Si no existe, agregarlo
            if (quantity > product.stock) {
                throw new Error(`Solo hay ${product.stock} unidades disponibles`);
            }
            cart.push({
                product: product,
                quantity: quantity
            });
        }
        
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartUI();
        showNotification('Producto agregado al carrito', 'success');
        
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        showNotification(error.message, 'error');
    }
}

// Remover producto del carrito
function removeFromCart(productId) {
    try {
        /* 
        ENDPOINT: DELETE /api/carrito/remover/{productId}
        Descripción: Remueve un producto del carrito
        Headers: Authorization: Bearer {token}
        */
        
        cart = cart.filter(item => item.product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartUI();
        renderCartItems();
        showNotification('Producto eliminado del carrito', 'info');
        
    } catch (error) {
        console.error('Error al remover del carrito:', error);
        showNotification('Error al remover producto', 'error');
    }
}

// Actualizar cantidad de producto en el carrito
function updateCartQuantity(productId, newQuantity) {
    try {
        /* 
        ENDPOINT: PUT /api/carrito/actualizar
        Descripción: Actualiza la cantidad de un producto en el carrito
        Headers: Authorization: Bearer {token}
        Body: {
            productoId: number,
            cantidad: number
        }
        */
        
        const itemIndex = cart.findIndex(item => item.product.id === productId);
        
        if (itemIndex !== -1) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
                return;
            }
            
            if (newQuantity > cart[itemIndex].product.stock) {
                showNotification(`Solo hay ${cart[itemIndex].product.stock} unidades disponibles`, 'warning');
                return;
            }
            
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            updateCartUI();
            renderCartItems();
        }
        
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        showNotification('Error al actualizar cantidad', 'error');
    }
}

// Vaciar carrito
function clearCart() {
    try {
        /* 
        ENDPOINT: DELETE /api/carrito/vaciar
        Descripción: Vacía completamente el carrito del usuario
        Headers: Authorization: Bearer {token}
        */
        
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartUI();
        renderCartItems();
        showNotification('Carrito vaciado', 'info');
        
    } catch (error) {
        console.error('Error al vaciar carrito:', error);
        showNotification('Error al vaciar carrito', 'error');
    }
}

// Calcular total del carrito
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
}

/**
 * CHECKOUT - Funciones para proceso de compra
 */

// Procesar checkout
async function processCheckout(checkoutData) {
    try {
        /* 
        ENDPOINT: POST /api/checkout
        Descripción: Procesa la compra del carrito
        Headers: Authorization: Bearer {token}
        Body: {
            items: Array,
            metodoPago: string,
            direccionEnvio: object,
            total: number
        }
        Respuesta esperada: {
            orderId: number,
            estado: string,
            total: number,
            fechaCreacion: string
        }
        */
        
        // REEMPLAZAR CON TU ENDPOINT REAL:
        // const token = localStorage.getItem('authToken');
        // const response = await fetch(`${API_BASE_URL}/checkout`, {
        //     method: 'POST',
        //     headers: {
        //         ...API_HEADERS,
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify(checkoutData)
        // });
        // const result = await response.json();
        // return result;
        
        // SIMULACIÓN DE CHECKOUT
        const orderId = Math.floor(Math.random() * 1000000);
        
        // Simular delay de procesamiento
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Vaciar carrito después de compra exitosa
        clearCart();
        
        return {
            orderId: orderId,
            estado: 'CONFIRMADO',
            total: checkoutData.total,
            fechaCreacion: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Error en checkout:', error);
        throw error;
    }
}

/**
 * AUTENTICACIÓN - Reutilizar funciones de script.js
 */

// Iniciar sesión de usuario (igual que en script.js)
async function loginUser(credentials) {
    try {
        // REEMPLAZAR CON TU ENDPOINT REAL (igual que en script.js)
        
        // SIMULACIÓN DE LOGIN
        console.log('Intentando login con:', credentials);
        
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

// ============================================
// EVENTOS Y FUNCIONALIDAD DE LA UI
// ============================================

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
    setupEventListeners();
    loadInitialData();
    updateCartUI(); // Actualizar contador del carrito al cargar
});

// Inicializar la página de productos
function initializeProductsPage() {
    // Obtener parámetros de la URL (para búsquedas desde index.html)
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        currentFilters.search = searchQuery;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
    }
    
    console.log('Página de productos inicializada');
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Modal de login (igual que en script.js)
    setupLoginModal();
    
    // Barra de búsqueda
    setupSearchFunctionality();
    
    // Filtros
    setupFilters();
    
    // Ordenamiento y vista
    setupSortingAndView();
    
    // Paginación
    setupPagination();
    
    // Carrito
    setupCartFunctionality();
}

// Configurar funcionalidad del carrito
function setupCartFunctionality() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCartSidebar);
    }
    
    // Cerrar carrito al hacer clic fuera
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartBtn = document.querySelector('.cart-btn');
        
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
                closeCartSidebar();
            }
        }
    });
}

// Configurar modal de login
function setupLoginModal() {
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
}

// Configurar funcionalidad de búsqueda
function setupSearchFunctionality() {
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
}

// Configurar filtros
function setupFilters() {
    // Filtro por categorías
    const categoryFilters = document.getElementById('categoryFilters');
    if (categoryFilters) {
        categoryFilters.addEventListener('change', handleCategoryFilter);
    }
    
    // Filtro por marcas
    const brandFilters = document.getElementById('brandFilters');
    if (brandFilters) {
        brandFilters.addEventListener('change', handleBrandFilter);
    }
    
    // Filtro de precio
    const applyPriceFilter = document.getElementById('applyPriceFilter');
    if (applyPriceFilter) {
        applyPriceFilter.addEventListener('click', handlePriceFilter);
    }
    
    // Filtro de stock
    const inStockOnly = document.getElementById('inStockOnly');
    if (inStockOnly) {
        inStockOnly.addEventListener('change', handleStockFilter);
    }
    
    // Limpiar filtros
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', handleClearFilters);
    }
}

// Configurar ordenamiento y vista
function setupSortingAndView() {
    // Selector de ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    
    // Botones de vista (grid/list)
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', handleViewChange);
    });
}

// Configurar paginación (se actualiza dinámicamente)
function setupPagination() {
    // La paginación se configura dinámicamente en renderPagination()
}

// ============================================
// MANEJADORES DE EVENTOS
// ============================================

// Manejar filtro de stock
function handleStockFilter(e) {
    currentFilters.inStock = e.target.checked;
    currentPage = 1;
    loadProducts();
}

// Limpiar todos los filtros
function handleClearFilters() {
    // Resetear filtros
    currentFilters = {
        category: '',
        brand: '',
        minPrice: null,
        maxPrice: null,
        inStock: false,
        search: ''
    };
    
    // Limpiar UI
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('inStockOnly').checked = false;
    
    // Desmarcar checkboxes
    const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    // Marcar "Todas las categorías"
    const allCategoriesCheckbox = document.querySelector('#categoryFilters input[value=""]');
    if (allCategoriesCheckbox) {
        allCategoriesCheckbox.checked = true;
    }
    
    currentPage = 1;
    loadProducts();
}

// Manejar cambio de ordenamiento
function handleSortChange(e) {
    currentSort = e.target.value;
    currentPage = 1;
    loadProducts();
}

// Manejar cambio de vista
function handleViewChange(e) {
    const viewType = e.target.closest('.view-btn').dataset.view;
    currentView = viewType;
    
    // Actualizar botones activos
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.closest('.view-btn').classList.add('active');
    
    // Actualizar grid
    const productsGrid = document.getElementById('productsGrid');
    if (viewType === 'list') {
        productsGrid.classList.add('list-view');
    } else {
        productsGrid.classList.remove('list-view');
    }
}

// ============================================
// FUNCIONES DEL CARRITO
// ============================================

// Mostrar/ocultar sidebar del carrito
function toggleCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        if (cartSidebar.classList.contains('active')) {
            renderCartItems();
        }
    }
}

// Cerrar sidebar del carrito
function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
    }
}

// Renderizar items del carrito
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartActions = document.getElementById('cartActions');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartActions) cartActions.style.display = 'none';
        if (cartTotal) cartTotal.textContent = '$0';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartActions) cartActions.style.display = 'flex';
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.product.imagen}" alt="${item.product.nombre}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.product.nombre}</h4>
                <p class="cart-item-price">${item.product.precio.toLocaleString()}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.product.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.product.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <p class="cart-item-subtotal">Subtotal: ${(item.product.precio * item.quantity).toLocaleString()}</p>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.product.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Actualizar total
    const total = calculateCartTotal();
    if (cartTotal) {
        cartTotal.textContent = `${total.toLocaleString()}`;
    }
}

// Abrir modal de checkout
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'warning');
        return;
    }
    
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.add('active');
        renderCheckoutSummary();
    }
}

// Cerrar modal de checkout
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
    }
}

// Renderizar resumen de checkout
function renderCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (checkoutItems) {
        checkoutItems.innerHTML = '';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <div class="checkout-item-info">
                    <span class="item-name">${item.product.nombre}</span>
                    <span class="item-quantity">x${item.quantity}</span>
                </div>
                <span class="item-total">${(item.product.precio * item.quantity).toLocaleString()}</span>
            `;
            checkoutItems.appendChild(itemElement);
        });
    }
    
    if (checkoutTotal) {
        const total = calculateCartTotal();
        checkoutTotal.textContent = `${total.toLocaleString()}`;
    }
}

// Procesar compra
async function handleCheckout(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const checkoutData = {
        items: cart.map(item => ({
            productoId: item.product.id,
            cantidad: item.quantity,
            precio: item.product.precio
        })),
        metodoPago: formData.get('paymentMethod'),
        direccionEnvio: {
            nombre: formData.get('fullName'),
            direccion: formData.get('address'),
            ciudad: formData.get('city'),
            codigoPostal: formData.get('zipCode'),
            telefono: formData.get('phone')
        },
        total: calculateCartTotal()
    };
    
    try {
        const submitBtn = form.querySelector('.checkout-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        
        const result = await processCheckout(checkoutData);
        
        closeCheckoutModal();
        closeCartSidebar();
        
        showNotification(`¡Compra exitosa! Número de orden: ${result.orderId}`, 'success');
        
        // Mostrar modal de confirmación
        showOrderConfirmationModal(result);
        
    } catch (error) {
        showNotification('Error al procesar la compra. Intenta nuevamente.', 'error');
    } finally {
        const submitBtn = form.querySelector('.checkout-submit-btn');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-credit-card"></i> Confirmar Compra';
    }
}

// Mostrar modal de confirmación de orden
function showOrderConfirmationModal(orderData) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content order-confirmation-modal">
            <div class="modal-header">
                <h3><i class="fas fa-check-circle"></i> ¡Compra Confirmada!</h3>
            </div>
            <div class="modal-body">
                <div class="order-info">
                    <p><strong>Número de orden:</strong> ${orderData.orderId}</p>
                    <p><strong>Total:</strong> ${orderData.total.toLocaleString()}</p>
                    <p><strong>Estado:</strong> ${orderData.estado}</p>
                    <p><strong>Fecha:</strong> ${new Date(orderData.fechaCreacion).toLocaleDateString()}</p>
                </div>
                <p class="order-message">
                    Te hemos enviado un email de confirmación con los detalles de tu compra.
                    Puedes seguir el estado de tu pedido en tu cuenta.
                </p>
                <button class="submit-btn" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-check"></i>
                    Entendido
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ============================================
// FUNCIONES DE CARGA Y RENDERIZADO
// ============================================

// Cargar datos iniciales
async function loadInitialData() {
    try {
        showLoadingSpinner(true);
        
        // Cargar categorías y marcas para los filtros
        categories = await getCategories();
        brands = await getBrands();
        
        // Renderizar filtros
        renderCategoryFilters();
        renderBrandFilters();
        
        // Cargar productos
        await loadProducts();
        
    } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        showNotification('Error al cargar los datos', 'error');
    } finally {
        showLoadingSpinner(false);
    }
}

// Cargar productos con filtros actuales
async function loadProducts() {
    try {
        showLoadingSpinner(true);
        
        const data = await getAllProducts(currentPage, productsPerPage, currentFilters, currentSort);
        
        allProducts = data.productos;
        
        // Renderizar productos
        renderProducts(allProducts);
        
        // Actualizar información de resultados
        updateResultsCount(data.totalProducts);
        
        // Renderizar paginación
        renderPagination(data.totalPages, data.currentPage);
        
    } catch (error) {
        console.error('Error cargando productos:', error);
        showNotification('Error al cargar los productos', 'error');
    } finally {
        showLoadingSpinner(false);
    }
}

// Renderizar filtros de categoría
function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;
    
    // Limpiar contenido existente excepto "Todas las categorías"
    const allCategoriesOption = container.querySelector('label');
    container.innerHTML = '';
    
    // Agregar "Todas las categorías"
    container.appendChild(allCategoriesOption);
    
    // Agregar categorías
    categories.forEach(category => {
        const label = document.createElement('label');
        label.className = 'filter-option';
        label.innerHTML = `
            <input type="checkbox" value="${category}">
            <span class="checkmark"></span>
            ${category}
        `;
        container.appendChild(label);
    });
}

// Renderizar filtros de marca
function renderBrandFilters() {
    const container = document.getElementById('brandFilters');
    if (!container) return;
    
    container.innerHTML = '';
    
    brands.forEach(brand => {
        const label = document.createElement('label');
        label.className = 'filter-option';
        label.innerHTML = `
            <input type="checkbox" value="${brand}">
            <span class="checkmark"></span>
            ${brand}
        `;
        container.appendChild(label);
    });
}

// Renderizar productos
function renderProducts(products) {
    const container = document.getElementById('productsGrid');
    const noProductsMsg = document.getElementById('noProducts');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.style.display = 'none';
        noProductsMsg.style.display = 'block';
        return;
    }
    
    container.style.display = currentView === 'list' ? 'flex' : 'grid';
    noProductsMsg.style.display = 'none';
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stockStatus = product.disponible && product.stock > 0 ? 'En stock' : 'Agotado';
    const stockClass = product.disponible && product.stock > 0 ? 'in-stock' : 'out-of-stock';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
            <div class="stock-badge ${stockClass}">${stockStatus}</div>
        </div>
        <div class="product-info">
            <h3>${product.nombre}</h3>
            <p class="product-description">${product.descripcion}</p>
            <div class="product-meta">
                <span class="product-brand">${product.marca}</span>
                <span class="product-category">${product.categoria}</span>
            </div>
            <div class="product-price">${product.precio.toLocaleString()}</div>
            <button class="product-btn" onclick="addToCart(${product.id})" ${!product.disponible || product.stock <= 0 ? 'disabled' : ''}>
                <i class="fas fa-cart-plus"></i>
                ${product.disponible && product.stock > 0 ? 'Agregar al carrito' : 'No disponible'}
            </button>
        </div>
    `;
    
    return card;
}

// Actualizar contador de resultados
function updateResultsCount(total) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `Mostrando ${total} producto${total !== 1 ? 's' : ''}`;
    }
}

// Renderizar paginación
function renderPagination(totalPages, currentPageNum) {
    const container = document.getElementById('pagination');
    if (!container || totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Botón anterior
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${currentPageNum - 1})" ${currentPageNum <= 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Páginas
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPageNum - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPageNum ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    // Botón siguiente
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${currentPageNum + 1})" ${currentPageNum >= totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    // Información de páginas
    paginationHTML += `
        <span class="pagination-info">
            Página ${currentPageNum} de ${totalPages}
        </span>
    `;
    
    container.innerHTML = paginationHTML;
}

// Cambiar página
function changePage(page) {
    if (page < 1) return;
    currentPage = page;
    loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar/ocultar spinner de carga
function showLoadingSpinner(show) {
    const spinner = document.getElementById('loadingSpinner');
    const productsGrid = document.getElementById('productsGrid');
    
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
    
    if (productsGrid) {
        productsGrid.style.display = show ? 'none' : (currentView === 'list' ? 'flex' : 'grid');
    }
}

// ============================================
// FUNCIONES AUXILIARES Y UI
// ============================================

// Actualizar UI después del login
function updateUIAfterLogin(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${user.nombre}</span>
        `;
        loginBtn.onclick = () => {
            console.log('Mostrar menú de usuario');
        };
    }
}

// Actualizar contador del carrito
function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}jar login (igual que en script.js)
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

// Manejar búsqueda
async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    currentFilters.search = query;
    currentPage = 1;
    
    await loadProducts();
}

// Manejar filtro por categoría
function handleCategoryFilter(e) {
    if (e.target.type === 'checkbox' && e.target.checked) {
        // Desmarcar otros checkboxes de categoría
        const categoryCheckboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]');
        categoryCheckboxes.forEach(cb => {
            if (cb !== e.target) cb.checked = false;
        });
        
        currentFilters.category = e.target.value;
        currentPage = 1;
        loadProducts();
    } else if (e.target.type === 'checkbox' && !e.target.checked) {
        currentFilters.category = '';
        currentPage = 1;
        loadProducts();
    }
}

// Manejar filtro por marca
function handleBrandFilter(e) {
    if (e.target.type === 'checkbox' && e.target.checked) {
        // Desmarcar otros checkboxes de marca
        const brandCheckboxes = document.querySelectorAll('#brandFilters input[type="checkbox"]');
        brandCheckboxes.forEach(cb => {
            if (cb !== e.target) cb.checked = false;
        });
        
        currentFilters.brand = e.target.value;
        currentPage = 1;
        loadProducts();
    } else if (e.target.type === 'checkbox' && !e.target.checked) {
        currentFilters.brand = '';
        currentPage = 1;
        loadProducts();
    }
}

// Manejar filtro de precio
function handlePriceFilter() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    
    currentFilters.minPrice = minPrice ? parseFloat(minPrice) : null;
    currentFilters.maxPrice = maxPrice ? parseFloat(maxPrice) : null;
    currentPage = 1;
    
    loadProducts();
}

// Mane