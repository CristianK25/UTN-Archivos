import { useState } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  Truck,
  Shield,
  MapPin,
  Bitcoin,
  Building2,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CartItem } from "./ShoppingCart";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (
    productId: string,
    quantity: number,
  ) => void;
  onRemoveItem: (productId: string) => void;
  onConfirmPurchase: () => void;
  onNavigateToShipping?: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmPurchase,
  onNavigateToShipping,
}: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState<
    "cart" | "shipping" | "payment"
  >("cart");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    verified: false,
  });
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "transfer" | "crypto"
  >("card");

  const subtotal = items.reduce(
    (s, i) => s + i.price * i.quantity,
    0,
  );
  const shipping = subtotal > 100000 ? 0 : 15000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleNext = () => {
    if (currentStep === "cart") setCurrentStep("shipping");
    else if (currentStep === "shipping")
      setCurrentStep("payment");
  };
  const handleBack = () => {
    if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("cart");
  };
  const handleVerifyAddress = () => {
    setTimeout(
      () => setShippingInfo((p) => ({ ...p, verified: true })),
      700,
    );
  };
  const handleConfirmPayment = () => {
    onConfirmPurchase();
    setCurrentStep("cart");
    setShippingInfo({
      name: "",
      email: "",
      address: "",
      city: "",
      phone: "",
      verified: false,
    });
  };
  const handleNavigateToShippingPage = () => {
    if (onNavigateToShipping) {
      onNavigateToShipping();
      onClose();
    }
  };

  // Helpers visuales
  const StepPill = ({
    n,
    label,
    state,
  }: {
    n: number;
    label: string;
    state: "done" | "active" | "idle";
  }) => (
    <div className="flex items-center gap-2">
      <div
        className={[
          "w-6 h-6 rounded-full text-[11px] grid place-items-center border",
          state === "active"
            ? "bg-violet-600 text-white border-violet-600"
            : state === "done"
              ? "bg-violet-100 text-violet-700 border-violet-200"
              : "bg-slate-100 text-slate-500 border-slate-200",
        ].join(" ")}
      >
        {n}
      </div>
      <span
        className={
          state === "active"
            ? "text-slate-900 font-medium text-xs"
            : "text-slate-500 text-xs"
        }
      >
        {label}
      </span>
    </div>
  );

  const EnumTitle = ({
    n,
    title,
    right,
  }: {
    n: number;
    title: string;
    right?: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] grid place-items-center">
          {n}
        </span>
        <h2 className="text-sm md:text-base font-semibold text-slate-800">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );

  if (!isOpen) return null;

  // Estados del stepper
  const stepState = (
    n: 1 | 2 | 3,
  ): "done" | "active" | "idle" => {
    const map = { cart: 1, shipping: 2, payment: 3 } as const;
    const curr = map[currentStep];
    if (n < curr) return "done";
    if (n === curr) return "active";
    return "idle";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          p-0 border-0 bg-transparent shadow-none
          !max-w-none sm:!max-w-none md:!max-w-none
          !w-[95vw] md:!w-[min(90vh,980px)]
          !h-[85vh] md:!h-[min(90vh,980px)]
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        "
      >
        <DialogTitle className="sr-only">
          Checkout —{" "}
          {currentStep === "cart"
            ? "Carrito"
            : currentStep === "shipping"
              ? "Envío"
              : "Pago"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Total ${total.toLocaleString()} — {itemCount}{" "}
          productos.
        </DialogDescription>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 w-full h-full flex flex-col">
          {/* Borde/acento superior */}
          <div className="h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600" />

          {/* Header compacto */}
          <div className="px-4 py-3 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-1 text-slate-700 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </Button>
                {/* Pills resumen */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                    ${total.toLocaleString()} Total
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200">
                    {itemCount} items
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                    {shipping === 0
                      ? "Envío gratis"
                      : `Envío $${shipping.toLocaleString()}`}
                  </div>
                </div>
              </div>

              {/* Stepper enumerado */}
              <div className="hidden md:flex items-center gap-3">
                <StepPill
                  n={1}
                  label="Carrito"
                  state={stepState(1)}
                />
                <div className="w-8 h-px bg-slate-200" />
                <StepPill
                  n={2}
                  label="Envío"
                  state={stepState(2)}
                />
                <div className="w-8 h-px bg-slate-200" />
                <StepPill
                  n={3}
                  label="Pago"
                  state={stepState(3)}
                />
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 min-h-0">
            {currentStep === "cart" && (
              <div className="p-4 h-full flex flex-col">
                <EnumTitle
                  n={1}
                  title="Resumen del pedido"
                  right={
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNavigateToShippingPage}
                        className="text-xs"
                      >
                        <MapPin className="h-3 w-3 mr-1" />{" "}
                        Dirección
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={items.length === 0}
                        size="sm"
                        className="text-xs bg-violet-600 hover:bg-violet-700"
                      >
                        Continuar
                      </Button>
                    </div>
                  }
                />

                {/* Caja de datos marcada */}
                <div className="flex-1 overflow-y-auto pr-1">
                  <div className="rounded-xl border border-slate-200 p-3 bg-white/60">
                    {items.length === 0 ? (
                      <div className="grid place-items-center text-slate-500 h-48">
                        <div className="text-center">
                          <div className="text-4xl mb-2">
                            🛒
                          </div>
                          <p>Tu carrito está vacío</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-lg border border-slate-200 bg-white shadow-sm p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                <ImageWithFallback
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <h3 className="text-sm font-medium text-slate-800 truncate">
                                      {item.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 truncate">
                                      {item.brand}
                                    </p>
                                    <div className="mt-1 flex items-center gap-1">
                                      <Badge
                                        variant="outline"
                                        className="text-[10px] py-0"
                                      >
                                        {item.category}
                                      </Badge>
                                      {item.inStock ? (
                                        <Badge
                                          variant="secondary"
                                          className="bg-emerald-100 text-emerald-700 text-[10px] py-0"
                                        >
                                          Stock
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="destructive"
                                          className="text-[10px] py-0"
                                        >
                                          Sin stock
                                        </Badge>
                                      )}
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-sm font-semibold text-emerald-600">
                                      $
                                      {(
                                        item.price *
                                        item.quantity
                                      ).toLocaleString()}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                      $
                                      {item.price.toLocaleString()}{" "}
                                      c/u
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                  <div className="inline-flex items-center rounded-full border border-slate-200 overflow-hidden">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        onUpdateQuantity(
                                          item.id,
                                          Math.max(
                                            1,
                                            item.quantity - 1,
                                          ),
                                        )
                                      }
                                      className="h-7 w-7 p-0 rounded-none"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-9 text-center text-sm font-medium">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        onUpdateQuantity(
                                          item.id,
                                          item.quantity + 1,
                                        )
                                      }
                                      className="h-7 w-7 p-0 rounded-none"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>

                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      onRemoveItem(item.id)
                                    }
                                    className="h-7 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span className="sr-only">
                                      Eliminar
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === "shipping" && (
              <div className="p-4 h-full flex flex-col">
                <EnumTitle
                  n={2}
                  title="Dirección de envío"
                  right={
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      size="sm"
                      className="text-xs"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 mr-1" />{" "}
                      Carrito
                    </Button>
                  }
                />

                <div className="flex-1 grid place-items-center">
                  {/* Caja enumerada */}
                  <div className="w-full max-w-lg space-y-4">
                    <div className="rounded-xl border-2 border-dashed border-slate-300 p-3">
                      <h3 className="text-xs font-semibold text-slate-600 mb-2">
                        2.1 Datos de contacto
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label
                            htmlFor="name"
                            className="text-xs"
                          >
                            Nombre Completo *
                          </Label>
                          <Input
                            id="name"
                            className="mt-1 text-sm"
                            placeholder="Juan Pérez"
                            value={shippingInfo.name}
                            onChange={(e) =>
                              setShippingInfo((p) => ({
                                ...p,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-xs"
                          >
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            className="mt-1 text-sm"
                            placeholder="juan@ejemplo.com"
                            value={shippingInfo.email}
                            onChange={(e) =>
                              setShippingInfo((p) => ({
                                ...p,
                                email: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-dashed border-slate-300 p-3">
                      <h3 className="text-xs font-semibold text-slate-600 mb-2">
                        2.2 Dirección
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <Label
                            htmlFor="address"
                            className="text-xs"
                          >
                            Dirección Completa *
                          </Label>
                          <Input
                            id="address"
                            className="mt-1 text-sm"
                            placeholder="Calle 123 #45-67, Barrio Centro"
                            value={shippingInfo.address}
                            onChange={(e) =>
                              setShippingInfo((p) => ({
                                ...p,
                                address: e.target.value,
                                verified: false,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="city"
                            className="text-xs"
                          >
                            Ciudad *
                          </Label>
                          <Input
                            id="city"
                            className="mt-1 text-sm"
                            placeholder="Bogotá"
                            value={shippingInfo.city}
                            onChange={(e) =>
                              setShippingInfo((p) => ({
                                ...p,
                                city: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-xs"
                          >
                            Teléfono *
                          </Label>
                          <Input
                            id="phone"
                            className="mt-1 text-sm"
                            placeholder="+57 300 123 4567"
                            value={shippingInfo.phone}
                            onChange={(e) =>
                              setShippingInfo((p) => ({
                                ...p,
                                phone: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="pt-2">
                        {!shippingInfo.verified ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={handleVerifyAddress}
                          >
                            <MapPin className="h-3.5 w-3.5 mr-1" />{" "}
                            Verificar Dirección
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                            <Check className="h-4 w-4 text-emerald-600" />
                            <span className="text-emerald-700 text-xs">
                              Dirección verificada
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={
                        !shippingInfo.name ||
                        !shippingInfo.email ||
                        !shippingInfo.address ||
                        !shippingInfo.verified
                      }
                      className="w-full text-sm bg-violet-600 hover:bg-violet-700"
                    >
                      Continuar al Pago
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="p-4 h-full flex flex-col">
                <EnumTitle
                  n={3}
                  title="Pago y resumen"
                  right={
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      size="sm"
                      className="text-xs"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 mr-1" />{" "}
                      Envío
                    </Button>
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1 min-h-0">
                  {/* 3.1 Método */}
                  <div className="md:col-span-3 min-h-0 overflow-y-auto pr-1">
                    <div className="rounded-xl border-2 border-dashed border-slate-300 p-3">
                      <h3 className="text-xs font-semibold text-slate-600 mb-2">
                        3.1 Método de pago
                      </h3>

                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(v: any) =>
                          setPaymentMethod(v)
                        }
                        className="space-y-3"
                      >
                        <Card
                          className={`cursor-pointer transition-all ${paymentMethod === "card" ? "ring-2 ring-violet-500 border-violet-300" : "border-slate-200"}`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem
                                value="card"
                                id="card"
                              />
                              <Label
                                htmlFor="card"
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 text-violet-600" />
                                  <div>
                                    <h3 className="text-sm font-semibold">
                                      Tarjeta
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                      Visa, Mastercard, Amex
                                    </p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className={`cursor-pointer transition-all ${paymentMethod === "transfer" ? "ring-2 ring-violet-500 border-violet-300" : "border-slate-200"}`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem
                                value="transfer"
                                id="transfer"
                              />
                              <Label
                                htmlFor="transfer"
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-emerald-600" />
                                  <div>
                                    <h3 className="text-sm font-semibold">
                                      Transferencia
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                      PSE / transferencia
                                      directa
                                    </p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className={`cursor-pointer transition-all ${paymentMethod === "crypto" ? "ring-2 ring-violet-500 border-violet-300" : "border-slate-200"}`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem
                                value="crypto"
                                id="crypto"
                              />
                              <Label
                                htmlFor="crypto"
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Bitcoin className="h-4 w-4 text-orange-600" />
                                  <div>
                                    <h3 className="text-sm font-semibold">
                                      Criptomonedas
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                      Bitcoin, Ethereum, USDT
                                    </p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      </RadioGroup>
                    </div>

                    {/* 3.2 Detalle */}
                    <Card className="mt-4 border-slate-200">
                      <CardContent className="p-4">
                        <h3 className="text-xs font-semibold text-slate-600 mb-2">
                          3.2 Detalle
                        </h3>
                        {paymentMethod === "card" && (
                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs">
                                Número de Tarjeta
                              </Label>
                              <Input
                                className="mt-1 text-sm"
                                placeholder="1234 5678 9012 3456"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs">
                                  Vencimiento
                                </Label>
                                <Input
                                  className="mt-1 text-sm"
                                  placeholder="MM/AA"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">
                                  CVV
                                </Label>
                                <Input
                                  className="mt-1 text-sm"
                                  placeholder="123"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">
                                Titular
                              </Label>
                              <Input
                                className="mt-1 text-sm"
                                placeholder="Como aparece en la tarjeta"
                              />
                            </div>
                          </div>
                        )}

                        {paymentMethod === "transfer" && (
                          <div className="space-y-2">
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-xs text-blue-700">
                              Te enviaremos los datos bancarios
                              y procesaremos tu pedido al
                              confirmar el pago.
                            </div>
                          </div>
                        )}

                        {paymentMethod === "crypto" && (
                          <div className="space-y-2">
                            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 text-xs text-orange-700">
                              Selecciona tu criptomoneda y
                              recibirás la dirección de wallet y
                              el monto exacto.
                            </div>
                            <div className="space-y-1 text-xs">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="crypto"
                                  defaultChecked
                                />{" "}
                                Bitcoin (BTC)
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="crypto"
                                />{" "}
                                Ethereum (ETH)
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="crypto"
                                />{" "}
                                Tether (USDT)
                              </label>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* 3.3 Resumen final */}
                  <div className="md:col-span-2">
                    <div className="md:sticky md:top-2">
                      <div className="rounded-xl border-2 border-dashed border-slate-300 p-3">
                        <h3 className="text-xs font-semibold text-slate-600 mb-2">
                          3.3 Resumen
                        </h3>

                        <Card className="border-slate-200 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                              Resumen Final
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>
                                Subtotal ({itemCount} items)
                              </span>
                              <span>
                                ${subtotal.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Envío</span>
                              <span>
                                {shipping === 0
                                  ? "Gratis"
                                  : `$${shipping.toLocaleString()}`}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Impuestos</span>
                              <span>
                                ${tax.toLocaleString()}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold text-sm">
                              <span>Total</span>
                              <span className="text-emerald-600">
                                ${total.toLocaleString()}
                              </span>
                            </div>

                            <div className="space-y-1 mt-3 text-xs text-slate-600">
                              <div className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />{" "}
                                <span>Pago seguro</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Truck className="h-3 w-3" />{" "}
                                <span>Entrega 2–5 días</span>
                              </div>
                            </div>

                            <Button
                              onClick={handleConfirmPayment}
                              className="w-full mt-4 text-sm bg-violet-600 hover:bg-violet-700"
                            >
                              Confirmar Pago
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
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