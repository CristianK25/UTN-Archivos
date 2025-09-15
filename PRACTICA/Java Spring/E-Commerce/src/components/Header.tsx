import { useState } from 'react';
import { Search, ShoppingCart, Monitor, Home, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface HeaderProps {
  cartItemsCount: number;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  currentPage: 'home' | 'products';
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export function Header({ 
  cartItemsCount, 
  onSearchChange, 
  onCartClick,
  currentPage,
  onNavigateHome,
  onNavigateProducts
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Layout - Home Page (Original Layout) */}
        {currentPage === 'home' && (
          <div className="hidden md:flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigateHome}>
              <div className="relative">
                <Monitor className="h-8 w-8 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  TechStore
                </span>
                <div className="text-xs text-gray-400 -mt-1">Pro Gaming</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Button
                variant={currentPage === 'home' ? 'secondary' : 'ghost'}
                onClick={onNavigateHome}
                className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Inicio
              </Button>
              <Button
                variant={currentPage === 'products' ? 'secondary' : 'ghost'}
                onClick={onNavigateProducts}
                className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <Package className="h-4 w-4" />
                Productos
              </Button>
            </nav>

            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="ml-2 hidden sm:inline">Carrito</span>
            </Button>
          </div>
        )}

        {/* Desktop Layout - Products Page (New Layout) */}
        {currentPage === 'products' && (
          <div className="hidden lg:flex items-center">
            {/* Left Section - Logo and Navigation */}
            <div className="flex items-center space-x-6">
              {/* Logo - Far left */}
              <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigateHome}>
                <div className="relative">
                  <Monitor className="h-8 w-8 text-cyan-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    TechStore
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">Pro Gaming</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex items-center space-x-4">
                <Button
                  variant={currentPage === 'home' ? 'secondary' : 'ghost'}
                  onClick={onNavigateHome}
                  className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Inicio
                </Button>
                <Button
                  variant={currentPage === 'products' ? 'secondary' : 'ghost'}
                  onClick={onNavigateProducts}
                  className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Package className="h-4 w-4" />
                  Productos
                </Button>
              </nav>
            </div>

            {/* Center Section - Search Bar Only */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-96 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar componentes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-cyan-400 w-full"
                />
              </div>
            </div>

            {/* Right Section - Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="ml-2">Carrito</span>
            </Button>
          </div>
        )}

        {/* Mobile/Tablet Layout - Home Page */}
        {currentPage === 'home' && (
          <div className="flex md:hidden items-center justify-between">
            {/* Left Section - Navigation */}
            <nav className="flex items-center space-x-2">
              <Button
                variant={currentPage === 'home' ? 'secondary' : 'ghost'}
                onClick={onNavigateHome}
                className="text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
                size="sm"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Button>
              <Button
                variant={currentPage === 'products' ? 'secondary' : 'ghost'}
                onClick={onNavigateProducts}
                className="text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
                size="sm"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Productos</span>
              </Button>
            </nav>

            {/* Center Section - Logo */}
            <div className="flex items-center space-x-2 cursor-pointer absolute left-1/2 transform -translate-x-1/2" onClick={onNavigateHome}>
              <div className="relative">
                <Monitor className="h-7 w-7 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  TechStore
                </span>
                <div className="text-xs text-gray-400 -mt-1 hidden sm:block">Pro Gaming</div>
              </div>
            </div>

            {/* Right Section - Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="ml-2 hidden sm:inline">Carrito</span>
            </Button>
          </div>
        )}

        {/* Mobile/Tablet Layout - Products Page */}
        {currentPage === 'products' && (
          <div className="flex lg:hidden items-center justify-between">
            {/* Left Section - Logo and Navigation */}
            <div className="flex items-center space-x-3">
              {/* Logo - Far left */}
              <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigateHome}>
                <div className="relative">
                  <Monitor className="h-7 w-7 text-cyan-400" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    TechStore
                  </span>
                  <div className="text-xs text-gray-400 -mt-1 hidden sm:block">Pro Gaming</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex items-center space-x-1">
                <Button
                  variant={currentPage === 'home' ? 'secondary' : 'ghost'}
                  onClick={onNavigateHome}
                  className="text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
                  size="sm"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Inicio</span>
                </Button>
                <Button
                  variant={currentPage === 'products' ? 'secondary' : 'ghost'}
                  onClick={onNavigateProducts}
                  className="text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
                  size="sm"
                >
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Productos</span>
                </Button>
              </nav>
            </div>

            {/* Right Section - Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="ml-2 hidden sm:inline">Carrito</span>
            </Button>
          </div>
        )}

        {/* Mobile Search Bar - Only show on products page */}
        {currentPage === 'products' && (
          <div className="lg:hidden mt-4 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar componentes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-cyan-400 w-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}