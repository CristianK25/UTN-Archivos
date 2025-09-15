import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Cpu, HardDrive, MemoryStick, Monitor, Star, Zap, Crown, Award, Shield, TrendingUp } from 'lucide-react';

interface PreBuiltComputer {
  id: string;
  name: string;
  category: 'Profesional' | 'Alta' | 'Media' | 'Baja';
  price: number;
  originalPrice?: number;
  image: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  performance: 'Extremo' | 'Alto' | 'Medio' | 'Eficiente';
  description: string;
}

interface PreBuiltComputersProps {
  onNavigateToProducts: () => void;
}

export function PreBuiltComputers({ onNavigateToProducts }: PreBuiltComputersProps) {
  const preBuiltComputers: PreBuiltComputer[] = [
    // Profesional (más cara)
    {
      id: 'pc-1',
      name: 'TechStore Workstation Elite Pro',
      category: 'Profesional',
      price: 6800000,
      originalPrice: 7500000,
      image: 'https://images.unsplash.com/photo-1653823815301-faf2f30db0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3RhdGlvbiUyMGNvbXB1dGVyJTIwc2V0dXAlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU1Nzc5MTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specs: {
        cpu: 'Intel i9-13900KS',
        gpu: 'RTX 4090 Ti 24GB',
        ram: '128GB DDR5-5600',
        storage: '4TB NVMe Gen4 + 8TB HDD'
      },
      features: ['Certificado Adobe', 'Renderizado 8K', 'Workstation Grade', 'Refrigeración Líquida Custom'],
      rating: 4.9,
      reviews: 89,
      inStock: true,
      performance: 'Extremo',
      description: 'La máxima expresión en workstations profesionales para arquitectos, ingenieros y creadores de contenido 8K.'
    },

    // Alta Calidad
    {
      id: 'pc-2',
      name: 'TechStore Gaming Beast Ultimate',
      category: 'Alta',
      price: 4200000,
      originalPrice: 4800000,
      image: 'https://images.unsplash.com/photo-1658671141384-c4317684a1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21wdXRlciUyMFJHQiUyMHNldHVwfGVufDF8fHx8MTc1NTc3OTE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specs: {
        cpu: 'AMD Ryzen 9 7950X',
        gpu: 'RTX 4080 Super 16GB',
        ram: '64GB DDR5-5600',
        storage: '2TB NVMe Gen4 + 2TB HDD'
      },
      features: ['RGB Personalizable', '4K Gaming 120fps', 'Ray Tracing Ultra', 'DLSS 3.0 Ready'],
      rating: 4.8,
      reviews: 234,
      inStock: true,
      performance: 'Extremo',
      description: 'Para gamers extremos que buscan el máximo rendimiento en 4K con todas las configuraciones al máximo.'
    },

    // Media Calidad
    {
      id: 'pc-3',
      name: 'TechStore Gaming Pro',
      category: 'Media',
      price: 2800000,
      originalPrice: 3200000,
      image: 'https://images.unsplash.com/photo-1701318134822-fcc7630206ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBjb21wdXRlciUyMHNldHVwJTIwUkdCfGVufDF8fHx8MTc1NTc3OTE5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specs: {
        cpu: 'Intel i7-13700F',
        gpu: 'RTX 4070 Super 12GB',
        ram: '32GB DDR5-5200',
        storage: '1TB NVMe Gen4'
      },
      features: ['1440p Gaming 144fps', 'Stream Ready', 'RGB Iluminación', 'VR Compatible'],
      rating: 4.6,
      reviews: 456,
      inStock: true,
      performance: 'Alto',
      description: 'Perfecta para gaming en 1440p y streaming profesional con excelente relación precio-rendimiento.'
    },

    // Baja Calidad (entrada)
    {
      id: 'pc-4',
      name: 'TechStore Gaming Essential',
      category: 'Baja',
      price: 1800000,
      image: 'https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pJTIwSVRYJTIwY29tcHV0ZXIlMjBidWlsZCUyMGNvbXBhY3R8ZW58MXx8fHwxNzU1Nzc5MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specs: {
        cpu: 'AMD Ryzen 5 7600',
        gpu: 'RTX 4060 8GB',
        ram: '16GB DDR5-4800',
        storage: '500GB NVMe'
      },
      features: ['1080p Gaming 60fps', 'Eficiencia Energética', 'Compacto', 'Actualizable'],
      rating: 4.4,
      reviews: 623,
      inStock: true,
      performance: 'Medio',
      description: 'Ideal para comenzar en el gaming moderno o para oficina avanzada con capacidad de juego casual.'
    }
  ];

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'Profesional':
        return {
          icon: <Crown className="h-5 w-5" />,
          color: 'bg-gradient-to-r from-purple-600 to-indigo-600',
          bgColor: 'bg-purple-50 border-purple-200',
          textColor: 'text-purple-700',
          description: 'Para profesionales que exigen lo máximo'
        };
      case 'Alta':
        return {
          icon: <Award className="h-5 w-5" />,
          color: 'bg-gradient-to-r from-red-500 to-pink-500',
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-700',
          description: 'Gaming de elite y contenido 4K'
        };
      case 'Media':
        return {
          icon: <TrendingUp className="h-5 w-5" />,
          color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-700',
          description: 'Excelente rendimiento equilibrado'
        };
      case 'Baja':
        return {
          icon: <Shield className="h-5 w-5" />,
          color: 'bg-gradient-to-r from-green-500 to-emerald-500',
          bgColor: 'bg-green-50 border-green-200',
          textColor: 'text-green-700',
          description: 'Entrada al gaming moderno'
        };
      default:
        return {
          icon: <Zap className="h-5 w-5" />,
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50 border-gray-200',
          textColor: 'text-gray-700',
          description: ''
        };
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Extremo': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Alto': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medio': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Eficiente': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Ordenar por categoría: Profesional, Alta, Media, Baja
  const sortedComputers = preBuiltComputers.sort((a, b) => {
    const order = { 'Profesional': 0, 'Alta': 1, 'Media': 2, 'Baja': 3 };
    return order[a.category] - order[b.category];
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <Zap className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">PCs Pre-armadas por Categoría</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Calidad Profesional Garantizada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde workstations profesionales hasta gaming de entrada, cada PC está cuidadosamente 
            seleccionada para ofrecer la mejor experiencia en su categoría.
          </p>
        </div>

        {/* Quality Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {['Profesional', 'Alta', 'Media', 'Baja'].map((category) => {
            const info = getCategoryInfo(category);
            return (
              <div key={category} className={`${info.bgColor} border p-4 rounded-xl text-center`}>
                <div className={`${info.color} text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  {info.icon}
                </div>
                <h3 className={`font-bold ${info.textColor} mb-1`}>{category}</h3>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            );
          })}
        </div>

        {/* PCs Grid by Quality */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {sortedComputers.map((pc) => {
            const discount = pc.originalPrice 
              ? Math.round(((pc.originalPrice - pc.price) / pc.originalPrice) * 100)
              : 0;
            
            const categoryInfo = getCategoryInfo(pc.category);

            return (
              <Card key={pc.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white shadow-lg relative">
                {/* Quality Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className={`${categoryInfo.color} text-white font-bold border-0 shadow-lg`}>
                    {pc.category}
                  </Badge>
                </div>

                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={pc.image}
                    alt={pc.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {discount > 0 && (
                      <Badge className="bg-red-500 text-white font-bold animate-pulse shadow-lg">
                        -{discount}%
                      </Badge>
                    )}
                    <Badge className={`${getPerformanceColor(pc.performance)} font-semibold border shadow-sm`}>
                      {pc.performance}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1">
                          <Cpu className="h-3 w-3" />
                          <span className="truncate text-xs">{pc.specs.cpu.split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Monitor className="h-3 w-3" />
                          <span className="truncate text-xs">{pc.specs.gpu.split(' ')[0]} {pc.specs.gpu.split(' ')[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {pc.name}
                  </CardTitle>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {pc.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(pc.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">
                        {pc.rating} ({pc.reviews})
                      </span>
                    </div>
                    {pc.inStock ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        En stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        Agotado
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Detailed Specs */}
                  <div className="space-y-2 mb-4">
                    <div className={`${categoryInfo.bgColor} border p-3 rounded-lg`}>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-3 w-3 text-blue-600" />
                          <span className="text-gray-700 font-medium">{pc.specs.cpu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Monitor className="h-3 w-3 text-green-600" />
                          <span className="text-gray-700 font-medium">{pc.specs.gpu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MemoryStick className="h-3 w-3 text-purple-600" />
                          <span className="text-gray-700 font-medium">{pc.specs.ram}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-3 w-3 text-orange-600" />
                          <span className="text-gray-700 font-medium">{pc.specs.storage}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {pc.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className={`text-xs ${categoryInfo.textColor} border-current`}>
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    {pc.originalPrice && (
                      <span className="text-sm text-gray-500 line-through block">
                        ${pc.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      ${pc.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full transition-all duration-300 ${
                      pc.inStock 
                        ? `${categoryInfo.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl` 
                        : 'bg-gray-400'
                    }`}
                    disabled={!pc.inStock}
                  >
                    {pc.inStock ? 'Ver Detalles' : 'Agotado'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-12 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">¿Necesitas algo personalizado?</h3>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Nuestros expertos pueden armar la PC perfecta para tus necesidades específicas. 
              Desde gaming competitivo hasta workstations profesionales, garantizamos la mejor calidad.
            </p>
            <div className="space-x-4">
              <Button 
                size="lg"
                onClick={onNavigateToProducts}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg"
              >
                Personalizar PC
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-xl"
              >
                Contactar Expertos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}