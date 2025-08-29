import { useState } from 'react';
import { X, Minus, Plus, Trash2, CreditCard, Truck, Shield, MapPin, Bitcoin, Building2, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CartItem } from './ShoppingCart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onConfirmPurchase: () => void;
}

export function CheckoutModal({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onConfirmPurchase 
}: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    verified: false
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'crypto'>('card');

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100000 ? 0 : 15000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleNext = () => {
    if (currentStep === 'cart') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('payment');
  };

  const handleBack = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('cart');
  };

  const handleVerifyAddress = () => {
    // Simulate address verification
    setTimeout(() => {
      setShippingInfo(prev => ({ ...prev, verified: true }));
    }, 1000);
  };

  const handleConfirmPayment = () => {
    onConfirmPurchase();
    setCurrentStep('cart');
    setShippingInfo({ name: '', email: '', address: '', city: '', phone: '', verified: false });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-white">
        <div className="flex flex-col h-full">
          {/* Minimalist Header with Summary */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-b px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
                  <X className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${total.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Total</div>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">{itemCount}</div>
                    <div className="text-xs text-gray-600">Items</div>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`}
                    </div>
                    <div className="text-xs text-gray-600">Envío</div>
                  </div>
                </div>
              </div>
              
              {currentStep === 'cart' && (
                <Button 
                  onClick={handleNext}
                  disabled={items.length === 0}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                >
                  Continuar Compra
                </Button>
              )}
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-auto">
            {currentStep === 'cart' && (
              <div className="p-8">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">Resumen de tu Pedido</h2>
                  
                  {items.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      <div className="text-6xl mb-4">🛒</div>
                      <h3 className="text-xl mb-2">Tu carrito está vacío</h3>
                      <p>Agrega algunos productos para continuar</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-6">
                              {/* Product Image */}
                              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <ImageWithFallback
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-gray-600 mb-2">{item.brand}</p>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">{item.category}</Badge>
                                  {item.inStock ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700">En stock</Badge>
                                  ) : (
                                    <Badge variant="destructive">Sin stock</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {item.specs.slice(0, 2).join(' • ')}
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="h-9 w-9 p-0"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-16 text-center font-medium text-lg">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="h-9 w-9 p-0"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              {/* Price */}
                              <div className="text-right w-32">
                                <div className="text-xl font-bold text-green-600">
                                  ${(item.price * item.quantity).toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ${item.price.toLocaleString()} c/u
                                </div>
                              </div>

                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveItem(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 'shipping' && (
              <div className="p-8">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Información de Envío</h2>
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Volver al Carrito
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Dirección de Entrega
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nombre Completo *</Label>
                          <Input
                            id="name"
                            value={shippingInfo.name}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Juan Pérez Rodríguez"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="juan@ejemplo.com"
                            className="mt-1"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Dirección Completa *</Label>
                          <Input
                            id="address"
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value, verified: false }))}
                            placeholder="Calle 123 #45-67, Barrio Centro"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">Ciudad *</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="Bogotá"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Teléfono *</Label>
                          <Input
                            id="phone"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+57 300 123 4567"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {shippingInfo.address && !shippingInfo.verified && (
                        <div className="pt-4">
                          <Button
                            onClick={handleVerifyAddress}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <MapPin className="h-4 w-4" />
                            Verificar Dirección
                          </Button>
                        </div>
                      )}

                      {shippingInfo.verified && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-green-700 font-medium">Dirección verificada correctamente</span>
                        </div>
                      )}

                      <div className="pt-6">
                        <Button
                          onClick={handleNext}
                          disabled={!shippingInfo.name || !shippingInfo.email || !shippingInfo.address || !shippingInfo.verified}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          size="lg"
                        >
                          Continuar al Pago
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Método de Pago</h2>
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Volver al Envío
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Payment Method Selection */}
                    <div className="lg:col-span-2">
                      <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                        <Card className={`cursor-pointer transition-all ${paymentMethod === 'card' ? 'ring-2 ring-blue-500' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <CreditCard className="h-6 w-6 text-blue-600" />
                                  <div>
                                    <h3 className="font-semibold">Tarjeta de Crédito/Débito</h3>
                                    <p className="text-sm text-gray-600">Visa, MasterCard, American Express</p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className={`cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'ring-2 ring-blue-500' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="transfer" id="transfer" />
                              <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <Building2 className="h-6 w-6 text-green-600" />
                                  <div>
                                    <h3 className="font-semibold">Transferencia Bancaria</h3>
                                    <p className="text-sm text-gray-600">PSE, transferencia directa</p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className={`cursor-pointer transition-all ${paymentMethod === 'crypto' ? 'ring-2 ring-blue-500' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="crypto" id="crypto" />
                              <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <Bitcoin className="h-6 w-6 text-orange-600" />
                                  <div>
                                    <h3 className="font-semibold">Criptomonedas</h3>
                                    <p className="text-sm text-gray-600">Bitcoin, Ethereum, USDT</p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      </RadioGroup>

                      {/* Payment Form based on selection */}
                      <Card className="mt-6">
                        <CardContent className="p-6">
                          {paymentMethod === 'card' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold mb-4">Datos de la Tarjeta</h4>
                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <Label>Número de Tarjeta</Label>
                                  <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Fecha de Vencimiento</Label>
                                    <Input placeholder="MM/AA" className="mt-1" />
                                  </div>
                                  <div>
                                    <Label>CVV</Label>
                                    <Input placeholder="123" className="mt-1" />
                                  </div>
                                </div>
                                <div>
                                  <Label>Nombre del Titular</Label>
                                  <Input placeholder="Como aparece en la tarjeta" className="mt-1" />
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'transfer' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold mb-4">Transferencia Bancaria</h4>
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-700 mb-2">
                                  Al continuar, recibirás los datos bancarios para realizar la transferencia.
                                </p>
                                <p className="text-xs text-blue-600">
                                  Tu pedido será procesado una vez confirmemos el pago.
                                </p>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'crypto' && (
                            <div className="space-y-4">
                              <h4 className="font-semibold mb-4">Pago con Criptomonedas</h4>
                              <div className="bg-orange-50 p-4 rounded-lg">
                                <p className="text-sm text-orange-700 mb-2">
                                  Selecciona tu criptomoneda preferida y recibirás la dirección de la wallet.
                                </p>
                                <div className="space-y-2 mt-3">
                                  <div className="flex items-center gap-2">
                                    <input type="radio" name="crypto" id="btc" className="text-orange-600" />
                                    <label htmlFor="btc" className="text-sm">Bitcoin (BTC)</label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" name="crypto" id="eth" className="text-orange-600" />
                                    <label htmlFor="eth" className="text-sm">Ethereum (ETH)</label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" name="crypto" id="usdt" className="text-orange-600" />
                                    <label htmlFor="usdt" className="text-sm">Tether (USDT)</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <Card className="sticky top-4">
                        <CardHeader>
                          <CardTitle>Resumen Final</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal ({itemCount} items)</span>
                            <span>${subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Envío</span>
                            <span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Impuestos</span>
                            <span>${tax.toLocaleString()}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-green-600">${total.toLocaleString()}</span>
                          </div>

                          <div className="space-y-2 mt-4 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <Shield className="h-3 w-3" />
                              <span>Pago 100% seguro</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-3 w-3" />
                              <span>Entrega en 2-5 días hábiles</span>
                            </div>
                          </div>

                          <Button
                            onClick={handleConfirmPayment}
                            className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                            size="lg"
                          >
                            Confirmar Pago
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}