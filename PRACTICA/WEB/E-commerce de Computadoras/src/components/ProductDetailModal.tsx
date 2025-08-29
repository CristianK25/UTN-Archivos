import { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Share2, Truck, Shield, Award, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from './ProductCard';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

interface DetailedSpecs {
  [key: string]: string | string[];
}

export function ProductDetailModal({ isOpen, onClose, product, onAddToCart }: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  // Detailed specifications based on product category
  const getDetailedSpecs = (product: Product): DetailedSpecs => {
    switch (product.category) {
      case 'gpu':
        return {
          'Especificaciones Técnicas': [
            'Arquitectura: Ada Lovelace / RDNA 3',
            'Proceso de Fabricación: 4nm TSMC',
            'Transistores: 76.3 mil millones',
            'Área del Die: 608 mm²'
          ],
          'Memoria': [
            `Capacidad: ${product.specs[0]}`,
            'Tipo: GDDR6X / GDDR6',
            'Ancho de Bus: 384-bit / 256-bit',
            'Ancho de Banda: 1008 GB/s / 624 GB/s'
          ],
          'Rendimiento': [
            `Frecuencia Base: 2205 MHz`,
            `Frecuencia Boost: ${product.specs[3]}`,
            'Shaders: 10240 / 3840',
            'RT Cores: 80 / 60 (3ra Gen / 2da Gen)'
          ],
          'Conectividad': [
            'DisplayPort 1.4a x3',
            'HDMI 2.1 x1',
            'Resolución Máxima: 7680x4320',
            'Monitores Simultáneos: 4'
          ],
          'Alimentación': [
            'TGP: 320W / 263W',
            'Conectores: 3x 8-pin / 2x 8-pin',
            'Fuente Recomendada: 850W / 700W',
            'Eficiencia: 80+ Gold recomendado'
          ],
          'Dimensiones': [
            'Largo: 304mm / 267mm',
            'Ancho: 137mm / 120mm',
            'Altura: 61mm / 50mm',
            'Slots: 3.5 / 2.5'
          ]
        };
      
      case 'cpu':
        return {
          'Especificaciones Técnicas': [
            `Núcleos: ${product.specs[0]}`,
            `Hilos: ${product.specs[1]}`,
            'Arquitectura: Raptor Lake / Zen 4',
            'Proceso: Intel 7 / TSMC 5nm'
          ],
          'Frecuencias': [
            `Frecuencia Base: ${product.specs[2]}`,
            `Frecuencia Boost: ${product.specs[3]}`,
            'Frecuencia Base E-Cores: 2.2GHz (Intel)',
            'Frecuencia Boost E-Cores: 4.3GHz (Intel)'
          ],
          'Caché': [
            'L1: 80KB por núcleo (I) + 48KB por núcleo (D)',
            'L2: 2MB por núcleo (P) + 4MB compartido (E)',
            'L3: 36MB / 64MB compartido',
            'Total: ~40MB / ~68MB'
          ],
          'Memoria': [
            'Tipo Soportado: DDR5-5600 / DDR4-3200',
            'Canales: Dual Channel',
            'Capacidad Máxima: 128GB',
            'Velocidad JEDEC: DDR5-4800 / DDR4-3200'
          ],
          'Gráficos Integrados': [
            'GPU: Intel UHD 770 / AMD Radeon',
            'Unidades de Ejecución: 32 / 2',
            'Frecuencia Base: 300MHz / 400MHz',
            'Frecuencia Máxima: 1.65GHz / 2.2GHz'
          ],
          'Especificaciones Eléctricas': [
            'TDP Base: 125W / 170W',
            'TDP Máximo: 253W / 230W',
            'Voltaje: 0.6V - 1.72V',
            'Temperatura Máxima: 100°C'
          ]
        };
      
      case 'ram':
        return {
          'Especificaciones de Memoria': [
            `Capacidad: ${product.specs[0]}`,
            `Velocidad: ${product.specs[1]}`,
            `Latencia: ${product.specs[2]}`,
            'Clasificación: JEDEC / XMP 3.0'
          ],
          'Timings Detallados': [
            'CAS Latency (CL): 16 / 36',
            'RAS to CAS (tRCD): 18 / 36',
            'Row Precharge (tRP): 18 / 36',
            'Active to Precharge (tRAS): 36 / 76'
          ],
          'Características Físicas': [
            'Factor de Forma: DIMM 288-pin',
            'Altura: 31mm / 44mm (con disipador)',
            'Voltaje: 1.35V / 1.1V',
            'Temperatura Operativa: 0°C a 85°C'
          ],
          'Compatibilidad': [
            'Intel: 12va Gen+ / AMD: Ryzen 5000+',
            'Motherboards: Z690+ / B550+',
            'Perfiles: XMP 3.0 / EXPO',
            'Garantía: Lifetime / 10 años'
          ],
          'Tecnología': [
            'IC: Samsung B-die / Hynix',
            'SPD: 2133MHz base',
            'Error Correction: Non-ECC',
            'Rank: Single / Dual Rank'
          ]
        };
      
      case 'storage':
        return {
          'Especificaciones de Almacenamiento': [
            `Capacidad: ${product.name.includes('2TB') ? '2TB' : '1TB'}`,
            `Velocidad Lectura: ${product.specs[1]}`,
            `Velocidad Escritura: ${product.specs[2]}`,
            `Garantía: ${product.specs[3]}`
          ],
          'Interfaz y Conectividad': [
            'Interfaz: PCIe 4.0 x4 / PCIe 3.0 x4',
            'Factor de Forma: M.2 2280',
            'Protocolo: NVMe 1.4 / 2.0',
            'Host Memory Buffer: Sí'
          ],
          'Rendimiento Detallado': [
            'IOPS Lectura: 1,000K / 740K',
            'IOPS Escritura: 1,000K / 800K',
            'Latencia Lectura: 68μs',
            'Latencia Escritura: 18μs'
          ],
          'Controlador y NAND': [
            'Controlador: Samsung Elpis / WD_BLACK',
            'NAND: 176L V-NAND TLC / 112L BiCS5',
            'DRAM Cache: 2GB / 1GB DDR4',
            'SLC Cache: Inteligente / Dinámico'
          ],
          'Especificaciones Físicas': [
            'Dimensiones: 80 x 22 x 2.38mm',
            'Peso: 7g / 9g',
            'Consumo Activo: 6.8W máx',
            'Consumo Idle: 30mW'
          ],
          'Características Adicionales': [
            'Encriptación: AES 256-bit',
            'Tecnología: Dynamic Thermal Guard',
            'Software: Samsung Magician / WD Dashboard',
            'Certificación: TCG Opal 2.0'
          ]
        };
      
      case 'motherboard':
        return {
          'Especificaciones del Chipset': [
            `Socket: ${product.specs[0]}`,
            'Chipset: X670E / B650',
            'Proceso: 6nm TSMC',
            `Memoria Soportada: ${product.specs[1]}`
          ],
          'Conectividad de Memoria': [
            'Slots: 4 x DIMM DDR5',
            'Capacidad Máxima: 128GB',
            'Velocidades: DDR5-6000+ (OC)',
            'Canales: Dual Channel'
          ],
          'Slots de Expansión': [
            `PCIe 5.0 x16: 1 slot`,
            `PCIe 4.0 x16: 1 slot (x8)`,
            'PCIe 4.0 x1: 2 slots',
            'M.2: 4 slots (PCIe 4.0)'
          ],
          'Conectividad USB': [
            'USB 3.2 Gen 2x2: 1 puerto (20Gbps)',
            'USB 3.2 Gen 2: 4 puertos (10Gbps)',
            'USB 3.2 Gen 1: 6 puertos (5Gbps)',
            'USB 2.0: 4 puertos'
          ],
          'Red y Conectividad': [
            `WiFi: ${product.specs[2]}`,
            'Ethernet: 2.5G LAN',
            'Bluetooth: 5.3',
            'Antenas WiFi: 2x2 MIMO'
          ],
          'Audio': [
            'Codec: Realtek ALC4080',
            'Canales: 7.1 Surround',
            'SNR: 120dB',
            'Amplificador: ESS SABRE9018Q2C'
          ]
        };
      
      default:
        return {
          'Especificaciones Generales': product.specs,
          'Características': [
            'Diseño optimizado para rendimiento',
            'Tecnología de última generación',
            'Compatibilidad extendida',
            'Garantía del fabricante'
          ]
        };
    }
  };

  const detailedSpecs = getDetailedSpecs(product);
  
  // Mock additional images
  const additionalImages = [
    product.image,
    product.image + '?variant=2',
    product.image + '?variant=3'
  ];

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600">{product.brand}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Left Side - Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={additionalImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image thumbnails */}
                <div className="flex gap-2">
                  {additionalImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Product Info */}
              <div className="space-y-6">
                {/* Price and Rating */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-medium">
                      {product.category.toUpperCase()}
                    </Badge>
                    {product.inStock ? (
                      <Badge className="bg-green-100 text-green-700">En Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Sin Stock</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reseñas)
                    </span>
                  </div>

                  <div className="space-y-2">
                    {product.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                        <Badge className="bg-red-500 text-white">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      </div>
                    )}
                    <div className="text-3xl font-bold text-green-600">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Quick Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Envío gratis</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Garantía oficial</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">Mejor precio</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                    <Zap className="h-5 w-5 text-orange-600" />
                    <span className="text-sm">Entrega rápida</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                      Favoritos
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Specifications Tabs */}
            <div className="px-6 pb-6">
              <Separator className="mb-6" />
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="specs">Especificaciones</TabsTrigger>
                  <TabsTrigger value="compatibility">Compatibilidad</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="specs" className="space-y-4">
                  <div className="grid gap-4">
                    {Object.entries(detailedSpecs).map(([category, specs]) => (
                      <Card key={category}>
                        <CardHeader>
                          <CardTitle className="text-lg">{category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            {Array.isArray(specs) ? (
                              specs.map((spec, index) => (
                                <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                                  <span className="text-gray-600">{spec.split(':')[0]}</span>
                                  <span className="font-medium">{spec.split(':')[1] || spec}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-700">{specs}</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="compatibility">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compatibilidad del Sistema</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">✓ Compatible con</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Sistemas Intel de 12va generación en adelante</li>
                            <li>• Sistemas AMD Ryzen 5000+ series</li>
                            <li>• Motherboards con soporte PCIe 4.0</li>
                            <li>• Fuentes de poder 650W+ (80+ Bronze)</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2">ℹ Recomendaciones</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Refrigeración adecuada del sistema</li>
                            <li>• Gabinete con buena ventilación</li>
                            <li>• RAM DDR5 para mejor rendimiento</li>
                            <li>• Monitor con soporte a altas frecuencias</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reseñas de Usuarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="text-4xl font-bold text-yellow-500">{product.rating}</div>
                          <div>
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">Basado en {product.reviews} reseñas</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {[
                            { rating: 5, author: "Juan P.", comment: "Excelente producto, superó mis expectativas. Muy buen rendimiento.", date: "Hace 1 semana" },
                            { rating: 4, author: "María G.", comment: "Buena calidad, aunque el precio es un poco alto. Lo recomiendo.", date: "Hace 2 semanas" },
                            { rating: 5, author: "Carlos R.", comment: "Perfecto para gaming, muy contento con la compra.", date: "Hace 1 mes" }
                          ].map((review, index) => (
                            <div key={index} className="border-b pb-4 last:border-b-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{review.author}</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < review.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-sm text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}