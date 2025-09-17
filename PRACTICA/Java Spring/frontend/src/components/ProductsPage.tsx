import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

interface ProductsPageProps {
  searchTerm: string;
  onBuy: (product: Product) => void;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Gaming MSI Katana 15",
    price: 89900,
    originalPrice: 99900,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1620705914357-a9d11009e068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBtb2Rlcm58ZW58MXx8fHwxNzU4MDYxMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Intel i7-12700H, RTX 4060, 16GB RAM, 1TB SSD",
    inStock: true
  },
  {
    id: 2,
    name: "Procesador AMD Ryzen 7 7700X",
    price: 32900,
    category: "Procesadores",
    image: "https://images.unsplash.com/photo-1707921270852-0bc1743a7604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2Nlc3NvciUyMGNwdXxlbnwxfHx8fDE3NTgwNjExMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "8 núcleos, 16 hilos, 4.5GHz base, Socket AM5",
    inStock: true
  },
  {
    id: 3,
    name: "Tarjeta Gráfica RTX 4070 Super",
    price: 67900,
    originalPrice: 72900,
    category: "Tarjetas Gráficas",
    image: "https://images.unsplash.com/photo-1658673847785-08f1738116f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGdyYXBoaWNzJTIwY2FyZCUyMGdwdXxlbnwxfHx8fDE3NTgwMjYwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "12GB GDDR6X, Ray Tracing, DLSS 3",
    inStock: false
  },
  {
    id: 4,
    name: "Motherboard ASUS ROG Strix B650-F",
    price: 24900,
    category: "Motherboards",
    image: "https://images.unsplash.com/photo-1672165407773-20262ff6ab13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNvbXBvbmVudHMlMjBtb3RoZXJib2FyZHxlbnwxfHx8fDE3NTc5ODUwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Socket AM5, DDR5, PCIe 5.0, WiFi 6E",
    inStock: true
  },
  {
    id: 5,
    name: "Memoria RAM Corsair Vengeance 32GB",
    price: 15900,
    category: "Memoria RAM",
    image: "https://images.unsplash.com/photo-1672165407773-20262ff6ab13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNvbXBvbmVudHMlMjBtb3RoZXJib2FyZHxlbnwxfHx8fDE3NTc5ODUwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "DDR5-5600, 2x16GB, RGB, CL36",
    inStock: true
  },
  {
    id: 6,
    name: "SSD Samsung 980 PRO 2TB",
    price: 18900,
    originalPrice: 21900,
    category: "Almacenamiento",
    image: "https://images.unsplash.com/photo-1672165407773-20262ff6ab13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNvbXBvbmVudHMlMjBtb3RoZXJib2FyZHxlbnwxfHx8fDE3NTc5ODUwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "NVMe M.2, 7000 MB/s lectura, 5GB caché",
    inStock: true
  }
];

export function ProductsPage({ searchTerm, onBuy }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(mockProducts.map(p => p.category))];
  const maxPrice = Math.max(...mockProducts.map(p => p.price));

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">Productos ({filteredProducts.length})</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </Button>
        </div>

        {showFilters && (
          <div className="bg-muted/30 p-6 rounded-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm mb-2">Categoría</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm mb-2">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre A-Z</SelectItem>
                    <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2">
                  Rango de Precio: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={maxPrice}
                  step={1000}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Filtros activos:</span>
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory('all')}>
                  {selectedCategory} ✕
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceRange([0, maxPrice])}>
                  ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} ✕
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onBuy={onBuy}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">
            No se encontraron productos que coincidan con tu búsqueda
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedCategory('all');
              setPriceRange([0, maxPrice]);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}