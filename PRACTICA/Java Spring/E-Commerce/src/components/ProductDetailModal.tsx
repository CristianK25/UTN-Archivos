import { useState } from "react";
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductCard";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

interface DetailedSpecs {
  [key: string]: string | string[];
}

/* ---------- helpers de imágenes ---------- */

// normaliza nombre → slug
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// Diccionario por modelo (pon tus archivos reales en /assets/...)
const GALLERY_MAP: Record<string, string[]> = {
  // GPUs
  "nvidia geforce rtx 4060 ti": [
    "/assets/products/gpu/rtx4060ti/01.jpg",
    "/assets/products/gpu/rtx4060ti/02.jpg",
    "/assets/products/gpu/rtx4060ti/03.jpg",
  ],
  "amd radeon rx 7800 xt": [
    "/assets/products/gpu/rx7800xt/01.jpg",
    "/assets/products/gpu/rx7800xt/02.jpg",
    "/assets/products/gpu/rx7800xt/03.jpg",
  ],
  "nvidia geforce rtx 4080 super": [
    "/assets/products/gpu/rtx4080super/01.jpg",
    "/assets/products/gpu/rtx4080super/02.jpg",
    "/assets/products/gpu/rtx4080super/03.jpg",
  ],

  // CPUs
  "amd ryzen 9 7900x": [
    "/assets/products/cpu/ryzen9-7900x/01.jpg",
    "/assets/products/cpu/ryzen9-7900x/02.jpg",
    "/assets/products/cpu/ryzen9-7900x/03.jpg",
  ],
  "intel core i5 13600k": [
    "/assets/products/cpu/i5-13600k/01.jpg",
    "/assets/products/cpu/i5-13600k/02.jpg",
    "/assets/products/cpu/i5-13600k/03.jpg",
  ],

  // Storage
  "wd black sn850x 1tb": [
    "/assets/products/storage/sn850x-1tb/01.jpg",
    "/assets/products/storage/sn850x-1tb/02.jpg",
    "/assets/products/storage/sn850x-1tb/03.jpg",
  ],
  "wd black sn850x 2tb": [
    "/assets/products/storage/sn850x-2tb/01.jpg",
    "/assets/products/storage/sn850x-2tb/02.jpg",
    "/assets/products/storage/sn850x-2tb/03.jpg",
  ],
};

// Fallback por categoría/brand
const FALLBACKS: Record<string, string[]> = {
  "gpu:nvidia": [
    "/assets/fallbacks/gpu/nvidia-01.jpg",
    "/assets/fallbacks/gpu/nvidia-02.jpg",
    "/assets/fallbacks/gpu/nvidia-03.jpg",
  ],
  "gpu:amd": [
    "/assets/fallbacks/gpu/amd-01.jpg",
    "/assets/fallbacks/gpu/amd-02.jpg",
    "/assets/fallbacks/gpu/amd-03.jpg",
  ],
  "cpu:intel": [
    "/assets/fallbacks/cpu/intel-01.jpg",
    "/assets/fallbacks/cpu/intel-02.jpg",
    "/assets/fallbacks/cpu/intel-03.jpg",
  ],
  "cpu:amd": [
    "/assets/fallbacks/cpu/amd-01.jpg",
    "/assets/fallbacks/cpu/amd-02.jpg",
    "/assets/fallbacks/cpu/amd-03.jpg",
  ],
  "ram:_": [
    "/assets/fallbacks/ram/ram-01.jpg",
    "/assets/fallbacks/ram/ram-02.jpg",
    "/assets/fallbacks/ram/ram-03.jpg",
  ],
  "storage:_": [
    "/assets/fallbacks/storage/nvme-01.jpg",
    "/assets/fallbacks/storage/nvme-02.jpg",
    "/assets/fallbacks/storage/nvme-03.jpg",
  ],
  "motherboard:_": [
    "/assets/fallbacks/motherboard/mb-01.jpg",
    "/assets/fallbacks/motherboard/mb-02.jpg",
    "/assets/fallbacks/motherboard/mb-03.jpg",
  ],
};

function getProductImages(p: Product): string[] {
  // 1) si el backend ya manda imágenes múltiples
  const anyP = p as any;
  if (Array.isArray(anyP.gallery) && anyP.gallery.length)
    return anyP.gallery;
  if (Array.isArray(anyP.images) && anyP.images.length)
    return anyP.images;

  // 2) buscar en diccionario por modelo
  const nameSlug = slugify(p.name);
  const byExact = Object.keys(GALLERY_MAP).find((k) =>
    nameSlug.includes(k),
  );
  if (byExact) return GALLERY_MAP[byExact];

  // 3) fallback por categoría + brand
  const brand = slugify(p.brand || "");
  const cat = (p.category || "").toLowerCase();
  const fbKey1 = `${cat}:${
    brand.includes("nvidia")
      ? "nvidia"
      : brand.includes("amd")
        ? "amd"
        : brand.includes("intel")
          ? "intel"
          : "_"
  }`;
  if (FALLBACKS[fbKey1]) return FALLBACKS[fbKey1];

  // 4) fallback general por categoría
  const fbKey2 = `${cat}:_`;
  if (FALLBACKS[fbKey2]) return FALLBACKS[fbKey2];

  // 5) último recurso: imagen principal repetida
  return [p.image];
}
/* ---------------------------------------- */

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  // IMÁGENES POR PRODUCTO (nuevo)
  const gallery = getProductImages(product);

  // Especificaciones detalladas (tu código original)
  const getDetailedSpecs = (
    product: Product,
  ): DetailedSpecs => {
    switch (product.category) {
      case "gpu":
        return {
          "Especificaciones Técnicas": [
            "Arquitectura: Ada Lovelace / RDNA 3",
            "Proceso de Fabricación: 4nm TSMC",
            "Transistores: 76.3 mil millones",
            "Área del Die: 608 mm²",
          ],
          Memoria: [
            `Capacidad: ${product.specs[0]}`,
            "Tipo: GDDR6X / GDDR6",
            "Ancho de Bus: 384-bit / 256-bit",
            "Ancho de Banda: 1008 GB/s / 624 GB/s",
          ],
          Rendimiento: [
            `Frecuencia Base: 2205 MHz`,
            `Frecuencia Boost: ${product.specs[3]}`,
            "Shaders: 10240 / 3840",
            "RT Cores: 80 / 60 (3ra Gen / 2da Gen)",
          ],
          Conectividad: [
            "DisplayPort 1.4a x3",
            "HDMI 2.1 x1",
            "Resolución Máxima: 7680x4320",
            "Monitores Simultáneos: 4",
          ],
          Alimentación: [
            "TGP: 320W / 263W",
            "Conectores: 3x 8-pin / 2x 8-pin",
            "Fuente Recomendada: 850W / 700W",
            "Eficiencia: 80+ Gold recomendado",
          ],
          Dimensiones: [
            "Largo: 304mm / 267mm",
            "Ancho: 137mm / 120mm",
            "Altura: 61mm / 50mm",
            "Slots: 3.5 / 2.5",
          ],
        };
      case "cpu":
        return {
          "Especificaciones Técnicas": [
            `Núcleos: ${product.specs[0]}`,
            `Hilos: ${product.specs[1]}`,
            "Arquitectura: Raptor Lake / Zen 4",
            "Proceso: Intel 7 / TSMC 5nm",
          ],
          Frecuencias: [
            `Frecuencia Base: ${product.specs[2]}`,
            `Frecuencia Boost: ${product.specs[3]}`,
            "Frecuencia Base E-Cores: 2.2GHz (Intel)",
            "Frecuencia Boost E-Cores: 4.3GHz (Intel)",
          ],
          Caché: [
            "L1: 80KB por núcleo (I) + 48KB por núcleo (D)",
            "L2: 2MB por núcleo (P) + 4MB compartido (E)",
            "L3: 36MB / 64MB compartido",
            "Total: ~40MB / ~68MB",
          ],
          Memoria: [
            "Tipo Soportado: DDR5-5600 / DDR4-3200",
            "Canales: Dual Channel",
            "Capacidad Máxima: 128GB",
            "Velocidad JEDEC: DDR5-4800 / DDR4-3200",
          ],
          "Gráficos Integrados": [
            "GPU: Intel UHD 770 / AMD Radeon",
            "Unidades de Ejecución: 32 / 2",
            "Frecuencia Base: 300MHz / 400MHz",
            "Frecuencia Máxima: 1.65GHz / 2.2GHz",
          ],
          "Especificaciones Eléctricas": [
            "TDP Base: 125W / 170W",
            "TDP Máximo: 253W / 230W",
            "Voltaje: 0.6V - 1.72V",
            "Temperatura Máxima: 100°C",
          ],
        };
      case "ram":
        return {
          "Especificaciones de Memoria": [
            `Capacidad: ${product.specs[0]}`,
            `Velocidad: ${product.specs[1]}`,
            `Latencia: ${product.specs[2]}`,
            "Clasificación: JEDEC / XMP 3.0",
          ],
          "Timings Detallados": [
            "CAS Latency (CL): 16 / 36",
            "RAS to CAS (tRCD): 18 / 36",
            "Row Precharge (tRP): 18 / 36",
            "Active to Precharge (tRAS): 36 / 76",
          ],
          "Características Físicas": [
            "Factor de Forma: DIMM 288-pin",
            "Altura: 31mm / 44mm (con disipador)",
            "Voltaje: 1.35V / 1.1V",
            "Temperatura Operativa: 0°C a 85°C",
          ],
          Compatibilidad: [
            "Intel: 12va Gen+ / AMD: Ryzen 5000+",
            "Motherboards: Z690+ / B550+",
            "Perfiles: XMP 3.0 / EXPO",
            "Garantía: Lifetime / 10 años",
          ],
          Tecnología: [
            "IC: Samsung B-die / Hynix",
            "SPD: 2133MHz base",
            "Error Correction: Non-ECC",
            "Rank: Single / Dual Rank",
          ],
        };
      case "storage":
        return {
          "Especificaciones de Almacenamiento": [
            `Capacidad: ${product.name.includes("2TB") ? "2TB" : "1TB"}`,
            `Velocidad Lectura: ${product.specs[1]}`,
            `Velocidad Escritura: ${product.specs[2]}`,
            `Garantía: ${product.specs[3]}`,
          ],
          "Interfaz y Conectividad": [
            "Interfaz: PCIe 4.0 x4 / PCIe 3.0 x4",
            "Factor de Forma: M.2 2280",
            "Protocolo: NVMe 1.4 / 2.0",
            "Host Memory Buffer: Sí",
          ],
          "Rendimiento Detallado": [
            "IOPS Lectura: 1,000K / 740K",
            "IOPS Escritura: 1,000K / 800K",
            "Latencia Lectura: 68μs",
            "Latencia Escritura: 18μs",
          ],
          "Controlador y NAND": [
            "Controlador: Samsung Elpis / WD_BLACK",
            "NAND: 176L V-NAND TLC / 112L BiCS5",
            "DRAM Cache: 2GB / 1GB DDR4",
            "SLC Cache: Inteligente / Dinámico",
          ],
          "Especificaciones Físicas": [
            "Dimensiones: 80 x 22 x 2.38mm",
            "Peso: 7g / 9g",
            "Consumo Activo: 6.8W máx",
            "Consumo Idle: 30mW",
          ],
          "Características Adicionales": [
            "Encriptación: AES 256-bit",
            "Tecnología: Dynamic Thermal Guard",
            "Software: Samsung Magician / WD Dashboard",
            "Certificación: TCG Opal 2.0",
          ],
        };
      case "motherboard":
        return {
          "Especificaciones del Chipset": [
            `Socket: ${product.specs[0]}`,
            "Chipset: X670E / B650",
            "Proceso: 6nm TSMC",
            `Memoria Soportada: ${product.specs[1]}`,
          ],
          "Conectividad de Memoria": [
            "Slots: 4 x DIMM DDR5",
            "Capacidad Máxima: 128GB",
            "Velocidades: DDR5-6000+ (OC)",
            "Canales: Dual Channel",
          ],
          "Slots de Expansión": [
            `PCIe 5.0 x16: 1 slot`,
            `PCIe 4.0 x16: 1 slot (x8)`,
            "PCIe 4.0 x1: 2 slots",
            "M.2: 4 slots (PCIe 4.0)",
          ],
          "Conectividad USB": [
            "USB 3.2 Gen 2x2: 1 puerto (20Gbps)",
            "USB 3.2 Gen 2: 4 puertos (10Gbps)",
            "USB 3.2 Gen 1: 6 puertos (5Gbps)",
            "USB 2.0: 4 puertos",
          ],
          "Red y Conectividad": [
            `WiFi: ${product.specs[2]}`,
            "Ethernet: 2.5G LAN",
            "Bluetooth: 5.3",
            "Antenas WiFi: 2x2 MIMO",
          ],
          Audio: [
            "Codec: Realtek ALC4080",
            "Canales: 7.1 Surround",
            "SNR: 120dB",
            "Amplificador: ESS SABRE9018Q2C",
          ],
        };
      default:
        return {
          "Especificaciones Generales": product.specs,
          Características: [
            "Diseño optimizado para rendimiento",
            "Tecnología de última generación",
            "Compatibilidad extendida",
            "Garantía del fabricante",
          ],
        };
    }
  };

  const detailedSpecs = getDetailedSpecs(product);

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!p-0 !border-0 !shadow-none !bg-transparent !max-w-none !w-screen !h-screen !translate-x-0 !translate-y-0 !top-0 !left-0 !rounded-none flex items-center justify-center">
        <DialogTitle className="sr-only">
          {product.name} - Especificaciones del Producto
        </DialogTitle>
        <DialogDescription className="sr-only">
          Detalles completos, especificaciones técnicas y compra
          de {product.name} de {product.brand}
        </DialogDescription>

        <div className="absolute inset-0" onClick={onClose} />

        <div
          className="relative w-[95vw] h-[95vh] max-w-6xl max-h-[800px] bg-white rounded-2xl shadow-2xl border border-gray-200
                     sm:w-[90vw] sm:h-[90vh] md:w-[85vw] md:h-[85vh] lg:w-[800px] lg:h-[800px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="min-w-0 flex-1">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  {product.brand}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Top: galería + compra */}
            <div className="p-3 sm:p-4 md:p-6 border-b bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Galería */}
                <div className="space-y-3">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                    <ImageWithFallback
                      src={
                        gallery[selectedImage] ?? product.image
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    {gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImage === index
                            ? "border-blue-500 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
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

                {/* Compra */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge
                        variant="outline"
                        className="font-medium"
                      >
                        {product.category.toUpperCase()}
                      </Badge>
                      {product.inStock ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                          En Stock
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          Sin Stock
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {product.rating} ({product.reviews}{" "}
                        reseñas)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 py-3 px-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    {product.originalPrice && (
                      <div className="flex items-center gap-3">
                        <span className="text-lg text-gray-500 line-through">
                          $
                          {product.originalPrice.toLocaleString()}
                        </span>
                        <Badge className="bg-red-500 text-white">
                          -
                          {Math.round(
                            ((product.originalPrice -
                              product.price) /
                              product.originalPrice) *
                              100,
                          )}
                          % OFF
                        </Badge>
                      </div>
                    )}
                    <div className="text-3xl font-bold text-green-600">
                      ${product.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">
                      Precio incluye IVA
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span className="text-xs sm:text-sm font-medium">
                        Envío gratis
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-xs sm:text-sm font-medium">
                        Garantía oficial
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span className="text-xs sm:text-sm font-medium">
                        Mejor precio
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                      <Zap className="h-4 w-4 text-orange-600" />
                      <span className="text-xs sm:text-sm font-medium">
                        Entrega rápida
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {product.inStock
                        ? "Agregar al Carrito"
                        : "Sin Stock"}
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setIsFavorite(!isFavorite)
                        }
                        className="hover:bg-red-50 hover:border-red-200 transition-colors"
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`}
                        />
                        Favoritos
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: tabs (especificaciones, etc.) */}
            <div className="bg-white">
              <Tabs defaultValue="specs" className="w-full">
                <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger
                      value="specs"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                    >
                      📋 Especificaciones
                    </TabsTrigger>
                    <TabsTrigger
                      value="compatibility"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                    >
                      🔧 Compatibilidad
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                    >
                      ⭐ Reseñas
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                  {/* ... (tu contenido original de specs/compatibility/reviews) ... */}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}