import { useState } from 'react';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  specs: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-200 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm font-medium">
            {product.brand}
          </Badge>
          {discount > 0 && (
            <Badge className="bg-red-500 text-white font-bold animate-pulse">
              -{discount}%
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Stock Status */}
        <div className="absolute bottom-3 left-3">
          {product.inStock ? (
            <Badge className="bg-green-500 text-white">En stock</Badge>
          ) : (
            <Badge variant="destructive">Sin stock</Badge>
          )}
        </div>

        {/* Quick View Button - appears on hover */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="bg-white/90 hover:bg-white text-gray-800 backdrop-blur-sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            Vista Rápida
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {product.category.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-0">
        {/* Key Features - Only show 2 main specs briefly */}
        <div className="space-y-2 mb-4">
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{product.specs[0]}</span>
            </div>
            {product.specs[1] && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{product.specs[1]}</span>
              </div>
            )}
          </div>
          
          {/* View Details Link */}
          <button
            onClick={() => onViewDetails(product)}
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            Ver especificaciones completas →
          </button>
        </div>
      </CardContent>

      {/* Footer with Price and Actions */}
      <CardFooter className="pt-0 flex flex-col gap-3">
        {/* Price */}
        <div className="w-full">
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through block">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ${product.price.toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2">
          <Button 
            className={`w-full transition-all duration-300 ${
              product.inStock 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                : 'bg-gray-400'
            }`}
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Agregar al Carrito' : 'Agotado'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full hover:bg-blue-50 hover:border-blue-300"
            onClick={() => onViewDetails(product)}
          >
            Ver Detalles
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}