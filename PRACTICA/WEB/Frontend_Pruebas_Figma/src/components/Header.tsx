import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, User, ShoppingCart } from "lucide-react";

interface HeaderProps {
  activeTab: 'inicio' | 'productos';
  onTabChange: (tab: 'inicio' | 'productos') => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onLogin: () => void;
}

export function Header({ activeTab, onTabChange, searchTerm, onSearchChange, onLogin }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-semibold">TechStore</h1>
            <nav className="flex space-x-6">
              <button
                onClick={() => onTabChange('inicio')}
                className={`pb-2 transition-colors ${
                  activeTab === 'inicio'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => onTabChange('productos')}
                className={`pb-2 transition-colors ${
                  activeTab === 'productos'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Productos
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {activeTab === 'productos' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            )}
            
            <Button onClick={onLogin} variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Ingresar
            </Button>
            
            <Button variant="outline" size="sm">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}