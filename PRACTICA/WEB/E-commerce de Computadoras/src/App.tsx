import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar, Category } from './components/Sidebar';
import { ProductGrid } from './components/ProductGrid';
import { ShoppingCart, CartItem } from './components/ShoppingCart';
import { CheckoutModal } from './components/CheckoutModal';
import { ChatBot } from './components/ChatBot';
import { HomePage } from './components/HomePage';
import { Product } from './components/ProductCard';
import { toast } from "sonner@2.0.3";
import { Toaster } from './components/ui/sonner';

// Mock data with brands
const categories: Category[] = [
  { 
    id: 'gpu', 
    name: 'Tarjetas Gráficas', 
    icon: '🎮',
    brands: ['NVIDIA', 'AMD']
  },
  { 
    id: 'cpu', 
    name: 'Procesadores', 
    icon: '🖥️',
    brands: ['Intel', 'AMD']
  },
  { 
    id: 'ram', 
    name: 'Memoria RAM', 
    icon: '💾',
    brands: ['Corsair', 'G.Skill', 'Kingston']
  },
  { 
    id: 'storage', 
    name: 'Almacenamiento', 
    icon: '💿',
    brands: ['Samsung', 'WD', 'Seagate']
  },
  { 
    id: 'motherboard', 
    name: 'Motherboards', 
    icon: '🔌',
    brands: ['ASUS', 'MSI', 'Gigabyte']
  },
  { 
    id: 'psu', 
    name: 'Fuentes de Poder', 
    icon: '⚡',
    brands: ['Corsair', 'EVGA', 'Seasonic']
  },
  { 
    id: 'cooling', 
    name: 'Refrigeración', 
    icon: '❄️',
    brands: ['NZXT', 'Corsair', 'Cooler Master']
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'NVIDIA GeForce RTX 4080 Super',
    brand: 'NVIDIA',
    price: 899000,
    originalPrice: 1100000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    category: 'gpu',
    specs: ['16GB GDDR6X', 'DLSS 3.0', 'Ray Tracing', '2550 MHz Boost'],
    inStock: true,
    rating: 4.8,
    reviews: 342
  },
  {
    id: '2',
    name: 'AMD Radeon RX 7800 XT',
    brand: 'AMD',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    category: 'gpu',
    specs: ['16GB GDDR6', 'RDNA 3', 'Ray Tracing', '2430 MHz Game Clock'],
    inStock: true,
    rating: 4.6,
    reviews: 278
  },
  {
    id: '3',
    name: 'NVIDIA GeForce RTX 4060 Ti',
    brand: 'NVIDIA',
    price: 450000,
    originalPrice: 520000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    category: 'gpu',
    specs: ['8GB GDDR6', 'DLSS 3.0', 'Ray Tracing', '2310 MHz Boost'],
    inStock: true,
    rating: 4.4,
    reviews: 189
  },
  {
    id: '4',
    name: 'Intel Core i9-13900K',
    brand: 'Intel',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1555617778-02518db0d14d?w=400',
    category: 'cpu',
    specs: ['24 Núcleos', '32 Threads', 'Base 3.0GHz', 'Boost 5.8GHz'],
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '5',
    name: 'AMD Ryzen 9 7900X',
    brand: 'AMD',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1555617778-02518db0d14d?w=400',
    category: 'cpu',
    specs: ['12 Núcleos', '24 Threads', 'Base 4.7GHz', 'Boost 5.6GHz'],
    inStock: true,
    rating: 4.6,
    reviews: 203
  },
  {
    id: '6',
    name: 'Intel Core i5-13600K',
    brand: 'Intel',
    price: 280000,
    originalPrice: 320000,
    image: 'https://images.unsplash.com/photo-1555617778-02518db0d14d?w=400',
    category: 'cpu',
    specs: ['14 Núcleos', '20 Threads', 'Base 3.5GHz', 'Boost 5.1GHz'],
    inStock: true,
    rating: 4.5,
    reviews: 167
  },
  {
    id: '7',
    name: 'Corsair Vengeance LPX 32GB',
    brand: 'Corsair',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400',
    category: 'ram',
    specs: ['DDR4-3200', '2x16GB Kit', 'CL16', 'Perfil XMP 2.0'],
    inStock: true,
    rating: 4.3,
    reviews: 445
  },
  {
    id: '8',
    name: 'G.Skill Trident Z5 32GB',
    brand: 'G.Skill',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400',
    category: 'ram',
    specs: ['DDR5-5600', '2x16GB Kit', 'CL36', 'RGB Lighting'],
    inStock: true,
    rating: 4.7,
    reviews: 234
  },
  {
    id: '9',
    name: 'Samsung 980 PRO 2TB',
    brand: 'Samsung',
    price: 180000,
    originalPrice: 220000,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    category: 'storage',
    specs: ['NVMe M.2', '7000 MB/s Read', '6900 MB/s Write', '5 años garantía'],
    inStock: true,
    rating: 4.8,
    reviews: 567
  },
  {
    id: '10',
    name: 'WD Black SN850X 1TB',
    brand: 'WD',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    category: 'storage',
    specs: ['NVMe M.2', '7300 MB/s Read', '6600 MB/s Write', 'Gaming Optimized'],
    inStock: true,
    rating: 4.5,
    reviews: 389
  },
  {
    id: '11',
    name: 'ASUS ROG Strix X670E-E',
    brand: 'ASUS',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
    category: 'motherboard',
    specs: ['Socket AM5', 'DDR5-5600', 'WiFi 6E', 'PCIe 5.0'],
    inStock: false,
    rating: 4.6,
    reviews: 123
  },
  {
    id: '12',
    name: 'MSI MAG B650 Tomahawk',
    brand: 'MSI',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
    category: 'motherboard',
    specs: ['Socket AM5', 'DDR5-5200', 'WiFi 6', 'PCIe 4.0'],
    inStock: true,
    rating: 4.4,
    reviews: 98
  },
  {
    id: '13',
    name: 'Corsair RM850x 850W',
    brand: 'Corsair',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1562976540-906c2a67b0da?w=400',
    category: 'psu',
    specs: ['80+ Gold', 'Modular', '850W', '10 años garantía'],
    inStock: true,
    rating: 4.7,
    reviews: 456
  },
  {
    id: '14',
    name: 'NZXT Kraken X63',
    brand: 'NZXT',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1587134160474-7b222298df0c?w=400',
    category: 'cooling',
    specs: ['280mm Radiador', 'RGB Infinity Mirror', 'CAM Software', 'Socket AM5'],
    inStock: true,
    rating: 4.5,
    reviews: 234
  }
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'products'>('home');

  // Filter products based on category, brand and search
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        toast.success(`Cantidad actualizada en el carrito`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${product.name} agregado al carrito`);
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Producto eliminado del carrito');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmPurchase = () => {
    toast.success('¡Compra completada! Gracias por tu pedido. Recibirás un email de confirmación.');
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const handleNavigateToProducts = () => {
    setCurrentPage('products');
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        cartItemsCount={cartItemsCount}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigateHome={handleNavigateHome}
        onNavigateProducts={handleNavigateToProducts}
      />

      {currentPage === 'home' ? (
        <HomePage onNavigateToProducts={handleNavigateToProducts} />
      ) : (
        <div className="flex">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            onCategorySelect={setSelectedCategory}
            onBrandSelect={setSelectedBrand}
          />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Catálogo de Productos
                </h1>
                <p className="text-gray-600">
                  {filteredProducts.length} productos encontrados
                  {selectedCategory && ` en ${categories.find(c => c.id === selectedCategory)?.name}`}
                  {selectedBrand && ` de ${selectedBrand}`}
                  <span className="ml-2 text-sm text-blue-600">
                    • Haz clic en cualquier producto para ver especificaciones completas
                  </span>
                </p>
              </div>

              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          </main>
        </div>
      )}

      {/* Simple Cart Sidebar */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Expanded Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onConfirmPurchase={handleConfirmPurchase}
      />

      <ChatBot />
      <Toaster />
    </div>
  );
}