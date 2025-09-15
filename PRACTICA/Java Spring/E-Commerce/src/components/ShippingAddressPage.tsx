import { useState } from 'react';
import { ArrowLeft, MapPin, Check, Home, Building, Store, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface ShippingAddressPageProps {
  onBack: () => void;
}

interface Address {
  id: string;
  name: string;
  fullAddress: string;
  city: string;
  phone: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
}

export function ShippingAddressPage({ onBack }: ShippingAddressPageProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    fullAddress: '',
    city: '',
    phone: '',
    type: 'home' as const
  });

  // Mock saved addresses
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      fullAddress: 'Carrera 15 #93-47, Apt 402, Chapinero',
      city: 'Bogotá',
      phone: '+57 300 123 4567',
      type: 'home',
      isDefault: true
    },
    {
      id: '2',
      name: 'Juan Pérez',
      fullAddress: 'Calle 72 #10-34, Oficina 205, Torre B',
      city: 'Bogotá',
      phone: '+57 300 123 4567',
      type: 'work',
      isDefault: false
    }
  ]);

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.fullAddress && newAddress.city && newAddress.phone) {
      const newAddr: Address = {
        id: Date.now().toString(),
        ...newAddress,
        isDefault: savedAddresses.length === 0
      };
      setSavedAddresses(prev => [...prev, newAddr]);
      setNewAddress({ name: '', fullAddress: '', city: '', phone: '', type: 'home' });
      setShowAddForm(false);
    }
  };

  const handleSetDefault = (addressId: string) => {
    setSavedAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-5 w-5 text-blue-600" />;
      case 'work': return <Building className="h-5 w-5 text-green-600" />;
      default: return <Store className="h-5 w-5 text-purple-600" />;
    }
  };

  const getAddressTypeLabel = (type: string) => {
    switch (type) {
      case 'home': return 'Casa';
      case 'work': return 'Trabajo';
      default: return 'Otro';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Direcciones de Envío</h1>
              <p className="text-gray-600">Gestiona tus direcciones de entrega</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Saved Addresses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Direcciones Guardadas
              </CardTitle>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                Agregar Dirección
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedAddresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No tienes direcciones guardadas</p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="mt-3"
                >
                  Agregar tu primera dirección
                </Button>
              </div>
            ) : (
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                {savedAddresses.map((address) => (
                  <Card 
                    key={address.id}
                    className={`cursor-pointer transition-all ${
                      selectedAddress === address.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <RadioGroupItem 
                          value={address.id} 
                          id={address.id}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getAddressIcon(address.type)}
                            <span className="font-semibold text-gray-800">{address.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {getAddressTypeLabel(address.type)}
                            </Badge>
                            {address.isDefault && (
                              <Badge className="text-xs bg-green-100 text-green-700">
                                Predeterminada
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            <p className="font-medium text-gray-800">{address.fullAddress}</p>
                            <p>{address.city}</p>
                            <p>{address.phone}</p>
                          </div>

                          <div className="flex gap-2 mt-3">
                            {!address.isDefault && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSetDefault(address.id)}
                                className="text-xs"
                              >
                                Hacer predeterminada
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Add New Address Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Nueva Dirección</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newName">Nombre Completo *</Label>
                  <Input
                    id="newName"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Juan Pérez Rodríguez"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="newPhone">Teléfono *</Label>
                  <Input
                    id="newPhone"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+57 300 123 4567"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="newAddress">Dirección Completa *</Label>
                  <Input
                    id="newAddress"
                    value={newAddress.fullAddress}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, fullAddress: e.target.value }))}
                    placeholder="Calle 123 #45-67, Apt 402, Barrio Centro"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="newCity">Ciudad *</Label>
                  <Input
                    id="newCity"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Bogotá"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Tipo de dirección</Label>
                  <RadioGroup 
                    value={newAddress.type} 
                    onValueChange={(value: any) => setNewAddress(prev => ({ ...prev, type: value }))}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="flex items-center gap-1 cursor-pointer">
                        <Home className="h-4 w-4 text-blue-600" />
                        Casa
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="work" id="work" />
                      <Label htmlFor="work" className="flex items-center gap-1 cursor-pointer">
                        <Building className="h-4 w-4 text-green-600" />
                        Trabajo
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="flex items-center gap-1 cursor-pointer">
                        <Store className="h-4 w-4 text-purple-600" />
                        Otro
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleAddAddress}
                  disabled={!newAddress.name || !newAddress.fullAddress || !newAddress.city || !newAddress.phone}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Guardar Dirección
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {savedAddresses.length > 0 && (
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Volver al Checkout
            </Button>
            <Button 
              disabled={!selectedAddress}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Usar Dirección Seleccionada
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}