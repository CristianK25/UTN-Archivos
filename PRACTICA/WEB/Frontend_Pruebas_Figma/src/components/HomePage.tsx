import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Monitor, Cpu, HardDrive, Zap } from "lucide-react";

interface HomePageProps {
  onNavigateToProducts: () => void;
}

export function HomePage({ onNavigateToProducts }: HomePageProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl mb-6">Tu tienda de tecnología de confianza</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encuentra las mejores computadoras y componentes al mejor precio. 
            Calidad garantizada y envío rápido.
          </p>
          <Button onClick={onNavigateToProducts} size="lg" className="text-lg px-8 py-6">
            Ver Productos
          </Button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl text-center mb-12">Nuestras Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Monitor className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl mb-2">Computadoras</h3>
              <p className="text-muted-foreground">Laptops y PCs de escritorio</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Cpu className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl mb-2">Procesadores</h3>
              <p className="text-muted-foreground">CPUs Intel y AMD</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl mb-2">Tarjetas Gráficas</h3>
              <p className="text-muted-foreground">GPUs para gaming y trabajo</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <HardDrive className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl mb-2">Almacenamiento</h3>
              <p className="text-muted-foreground">SSDs y discos duros</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">✓</span>
              </div>
              <h3 className="text-xl mb-3">Calidad Garantizada</h3>
              <p className="text-muted-foreground">
                Todos nuestros productos cuentan con garantía oficial y soporte técnico.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">🚚</span>
              </div>
              <h3 className="text-xl mb-3">Envío Rápido</h3>
              <p className="text-muted-foreground">
                Entrega en 24-48 horas en la mayoría de productos disponibles.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">💰</span>
              </div>
              <h3 className="text-xl mb-3">Mejores Precios</h3>
              <p className="text-muted-foreground">
                Precios competitivos y ofertas especiales para nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}