import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeroCarousel } from './HeroCarousel';
import { PreBuiltComputers } from './PreBuiltComputers';
import { ShoppingBag, Zap, Shield, Truck } from 'lucide-react';

interface HomePageProps {
  onNavigateToProducts: () => void;
}

export function HomePage({ onNavigateToProducts }: HomePageProps) {
  const featuredOffers = [
    {
      id: 1,
      title: 'RTX 4080 Super',
      subtitle: 'Poder extremo para gaming',
      discount: '25%',
      originalPrice: 1100000,
      price: 825000,
      image: 'https://images.unsplash.com/photo-1658671227304-9a989a842c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBncmFwaGljcyUyMGNhcmQlMjBSR0J8ZW58MXx8fHwxNzU1Nzc3OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      title: 'AMD Ryzen 9 7900X',
      subtitle: 'Procesamiento de nueva generación',
      discount: '15%',
      originalPrice: 450000,
      price: 382500,
      image: 'https://images.unsplash.com/photo-1754928864246-dc4fa729ee1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21wdXRlciUyMGNvbXBvbmVudHMlMjBtb3RoZXJib2FyZHxlbnwxfHx8fDE3NTU3Nzc5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      title: 'Samsung 980 PRO 2TB',
      subtitle: 'Velocidad increíble',
      discount: '20%',
      originalPrice: 220000,
      price: 176000,
      image: 'https://images.unsplash.com/photo-1716062890647-60feae0609d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGhhcmR3YXJlJTIwc2FsZSUyMHByb21vdGlvbnxlbnwxfHx8fDE3NTU3Nzc5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Garantía Extendida',
      description: 'Hasta 3 años de garantía'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Envío Gratis',
      description: 'En compras superiores a $50.000'
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: 'Soporte 24/7',
      description: 'Asistencia técnica completa'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <HeroCarousel onNavigateToProducts={onNavigateToProducts} />

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            ¿Por qué elegir TechStore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Built Computers Section */}
      <PreBuiltComputers onNavigateToProducts={onNavigateToProducts} />

      {/* Featured Offers */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🔥 Ofertas en Componentes
            </h2>
            <p className="text-lg text-gray-600">
              Los mejores componentes individuales con descuentos especiales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-purple-200">
                <div className="relative">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white font-bold text-lg px-3 py-1">
                    -{offer.discount}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.subtitle}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">
                        ${offer.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ${offer.price.toLocaleString()}
                      </span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                      Ver Oferta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">¿Listo para armar tu PC ideal?</h3>
              <p className="text-lg mb-6 text-purple-100">
                Explora nuestro catálogo completo con más de 500 productos
              </p>
              <Button 
                size="lg"
                onClick={onNavigateToProducts}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
              >
                Ir al Catálogo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}