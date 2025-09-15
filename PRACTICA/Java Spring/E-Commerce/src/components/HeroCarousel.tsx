import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  backgroundImage: string;
  gradientOverlay: string;
}

interface HeroCarouselProps {
  onNavigateToProducts: () => void;
}

export function HeroCarousel({ onNavigateToProducts }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners: HeroBanner[] = [
    {
      id: '1',
      title: 'TechStore Pro',
      subtitle: 'Gaming de Nueva Generación',
      description: 'Descubre los componentes más avanzados para gaming y profesionales. RTX 4090, Ryzen 9, y más con los mejores precios.',
      buttonText: 'Ver Productos',
      buttonAction: onNavigateToProducts,
      backgroundImage: 'https://images.unsplash.com/photo-1638909373254-e45848320a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21wdXRlciUyMGJhbm5lciUyMHByb21vdGlvbnxlbnwxfHx8fDE3NTU3Nzg1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradientOverlay: 'from-purple-900/80 via-blue-900/70 to-indigo-900/80'
    },
    {
      id: '2',
      title: 'Black Friday Tech',
      subtitle: 'Hasta 50% de Descuento',
      description: 'Las mejores ofertas del año en componentes gaming. GPUs, CPUs, y más con descuentos increíbles por tiempo limitado.',
      buttonText: 'Ver Ofertas',
      buttonAction: onNavigateToProducts,
      backgroundImage: 'https://images.unsplash.com/photo-1635778302434-07bbc7ba3dc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc2FsZSUyMGJhbm5lciUyMFJHQiUyMGxpZ2h0c3xlbnwxfHx8fDE3NTU3Nzg1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradientOverlay: 'from-red-900/80 via-orange-900/70 to-yellow-900/80'
    },
    {
      id: '3',
      title: 'Workstation Pro',
      subtitle: 'Para Profesionales',
      description: 'Componentes de grado profesional para creadores de contenido, desarrolladores y diseñadores. Máximo rendimiento garantizado.',
      buttonText: 'Explorar',
      buttonAction: onNavigateToProducts,
      backgroundImage: 'https://images.unsplash.com/photo-1542744989-2a681859d344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGhhcmR3YXJlJTIwYmFubmVyJTIwZGFya3xlbnwxfHx8fDE3NTU3Nzg1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradientOverlay: 'from-slate-900/80 via-gray-900/70 to-black/80'
    },
    {
      id: '4',
      title: 'Cyber Gaming',
      subtitle: 'El Futuro es Ahora',
      description: 'Sumérgete en el futuro del gaming con nuestra selección de componentes de última generación con RGB y diseños futuristas.',
      buttonText: 'Descubrir',
      buttonAction: onNavigateToProducts,
      backgroundImage: 'https://images.unsplash.com/photo-1648090587866-7c63a4ac6547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjB0ZWNobm9sb2d5JTIwYmFubmVyfGVufDF8fHx8MTc1NTc3ODU0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradientOverlay: 'from-cyan-900/80 via-blue-900/70 to-purple-900/80'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradientOverlay}`}>
              <ImageWithFallback
                src={banner.backgroundImage}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000">
                  {banner.title}
                </h1>
                <h2 className="text-2xl font-semibold mb-6 text-cyan-300 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                  {banner.subtitle}
                </h2>
                <p className="text-lg mb-8 text-gray-200 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                  {banner.description}
                </p>
                <div className="space-x-4 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
                  <Button 
                    size="lg" 
                    onClick={banner.buttonAction}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {banner.buttonText}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 rounded-xl backdrop-blur-sm"
                  >
                    Más Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / banners.length) * 100}%` }}
        />
      </div>
    </section>
  );
}