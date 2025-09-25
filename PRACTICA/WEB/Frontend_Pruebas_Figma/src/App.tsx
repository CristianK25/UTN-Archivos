import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Alert, AlertDescription } from './components/ui/alert';
import { toast } from 'sonner@2.0.3';
import { CheckCircle, User } from 'lucide-react';

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

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'productos'>('inicio');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = () => {
    setShowLoginDialog(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      setUserEmail(loginEmail);
      setShowLoginDialog(false);
      setLoginEmail('');
      setLoginPassword('');
      toast.success(`¡Bienvenido, ${loginEmail}!`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    toast.success('Sesión cerrada correctamente');
  };

  const handleBuy = (product: Product) => {
    setSelectedProduct(product);
    setShowPurchaseDialog(true);
  };

  const handlePurchaseConfirm = () => {
    if (selectedProduct) {
      setShowPurchaseDialog(false);
      toast.success(`¡${selectedProduct.name} agregado al carrito!`);
      setSelectedProduct(null);
    }
  };

  const handleNavigateToProducts = () => {
    setActiveTab('productos');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onLogin={isLoggedIn ? handleLogout : handleLogin}
      />

      <main>
        {activeTab === 'inicio' ? (
          <HomePage onNavigateToProducts={handleNavigateToProducts} />
        ) : (
          <ProductsPage searchTerm={searchTerm} onBuy={handleBuy} />
        )}
      </main>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {isLoggedIn ? 'Perfil de Usuario' : 'Iniciar Sesión'}
            </DialogTitle>
          </DialogHeader>
          
          {isLoggedIn ? (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Sesión activa como: {userEmail}
                </AlertDescription>
              </Alert>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Ingresar
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowLoginDialog(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                ¿No tienes cuenta? <span className="text-primary cursor-pointer hover:underline">Regístrate aquí</span>
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Compra</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-lg mx-auto mb-4"
                />
                <h3 className="text-lg">{selectedProduct.name}</h3>
                <p className="text-2xl text-primary">${selectedProduct.price.toLocaleString()}</p>
              </div>
              
              {!isLoggedIn && (
                <Alert>
                  <AlertDescription>
                    Debes iniciar sesión para realizar una compra.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={handlePurchaseConfirm} 
                  className="flex-1"
                  disabled={!isLoggedIn}
                >
                  {isLoggedIn ? 'Agregar al Carrito' : 'Iniciar Sesión'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPurchaseDialog(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}