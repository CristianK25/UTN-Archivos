import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CreditCard,
  Building2,
  Bitcoin,
  Shield,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Calendar,
  User,
  ArrowRight,
  Lock,
  Smartphone,
  Wallet,
  QrCode,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { CartItem } from "./ShoppingCart";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onPaymentSuccess: () => void;
}

interface CardForm {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

interface BankForm {
  bank: string;
  accountType: string;
  identification: string;
}

interface CryptoForm {
  currency: string;
  walletAddress: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  items,
  total,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "crypto"
  >("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [showCvv, setShowCvv] = useState(false);
  const [progress, setProgress] = useState(0);

  const [cardForm, setCardForm] = useState<CardForm>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [bankForm, setBankForm] = useState<BankForm>({
    bank: "",
    accountType: "ahorros",
    identification: "",
  });

  const [cryptoForm, setCryptoForm] = useState<CryptoForm>({
    currency: "BTC",
    walletAddress: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  // Formatear número de tarjeta
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  // Formatear fecha de expiración
  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  // Validaciones
  const validateCard = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (
      !cardForm.number ||
      cardForm.number.replace(/\s/g, "").length < 16
    )
      newErrors.number = "Número de tarjeta inválido";
    if (
      !cardForm.expiry ||
      !/^\d{2}\/\d{2}$/.test(cardForm.expiry)
    )
      newErrors.expiry = "Fecha de expiración inválida (MM/AA)";
    if (!cardForm.cvv || cardForm.cvv.length < 3)
      newErrors.cvv = "CVV inválido";
    if (!cardForm.name || cardForm.name.length < 2)
      newErrors.name = "Nombre del titular requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBank = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!bankForm.bank) newErrors.bank = "Selecciona tu banco";
    if (
      !bankForm.identification ||
      bankForm.identification.length < 8
    )
      newErrors.identification =
        "Documento de identificación inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCrypto = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!cryptoForm.currency)
      newErrors.currency = "Selecciona una criptomoneda";
    if (
      !cryptoForm.walletAddress ||
      cryptoForm.walletAddress.length < 26
    )
      newErrors.walletAddress = "Dirección de wallet inválida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Procesar pago
  const handlePayment = async () => {
    let isValid = false;
    switch (paymentMethod) {
      case "card":
        isValid = validateCard();
        break;
      case "bank":
        isValid = validateBank();
        break;
      case "crypto":
        isValid = validateCrypto();
        break;
    }
    if (!isValid) return;

    setIsProcessing(true);
    setPaymentStatus("processing");
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setPaymentStatus("success");
      toast.success("¡Pago procesado exitosamente!");
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
        resetForm();
      }, 2000);
    } catch {
      setPaymentStatus("error");
      toast.error(
        "Error al procesar el pago. Intenta nuevamente.",
      );
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setCardForm({ number: "", expiry: "", cvv: "", name: "" });
    setBankForm({
      bank: "",
      accountType: "ahorros",
      identification: "",
    });
    setCryptoForm({ currency: "BTC", walletAddress: "" });
    setErrors({});
    setPaymentStatus("idle");
    setProgress(0);
  };

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          p-0 border-0 bg-transparent shadow-none
          !max-w-none sm:!max-w-none md:!max-w-none
          !w-[95vw] md:!w-[min(90vh,1000px)]
          !h-[85vh] md:!h-[min(90vh,1000px)]
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        "
      >
        <DialogTitle className="sr-only">
          Ventana de Pago - TechStore
        </DialogTitle>
        <DialogDescription className="sr-only">
          Completa tu pago de forma segura. Total: $
          {total.toLocaleString()} para {itemCount} productos.
        </DialogDescription>

        <motion.div
          className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 w-full h-full flex flex-col"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Proceso de Pago
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Pago 100% seguro y encriptado
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    ${total.toLocaleString()}
                  </div>
                  <div className="text-blue-100 text-sm">
                    {itemCount} productos
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 p-2"
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-center text-blue-100 text-sm mt-2">
                    {progress < 100
                      ? "Procesando pago..."
                      : "Completando transacción..."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Panel izquierdo - Métodos de pago */}
            <div className="flex-1 p-5 overflow-y-auto min-w-0">
              <h3 className="text-lg font-semibold mb-4">
                Selecciona tu método de pago
              </h3>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: any) => {
                  setPaymentMethod(value);
                  setErrors({});
                }}
                className="space-y-3 mb-6"
                disabled={isProcessing}
              >
                {/* Tarjeta de Crédito */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${paymentMethod === "card" ? "ring-2 ring-blue-500 border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="card"
                          id="card"
                        />
                        <Label
                          htmlFor="card"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded-lg">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  Tarjeta de Crédito/Débito
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Visa, Mastercard, American
                                  Express
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <img
                                src="data:image/svg+xml,%3csvg width='40' height='24' viewBox='0 0 40 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='40' height='24' rx='4' fill='%23005BAC'/%3e%3cpath d='M16.283 18.814h2.934V5.186h-2.934v13.628zm14.467-13.628L27.85 18.814h-2.723l-.816-2.08h-4.006l-.817 2.08H16.77l3.878-13.628H23.75zm-3.567 9.18l-1.428-3.64-1.427 3.64h2.855z' fill='white'/%3e%3c/svg%3e"
                                alt="Visa"
                                className="h-6"
                              />
                              <img
                                src="data:image/svg+xml,%3csvg width='40' height='24' viewBox='0 0 40 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='40' height='24' rx='4' fill='%23EB001B'/%3e%3ccircle cx='15.5' cy='12' r='7' fill='%23EB001B'/%3e%3ccircle cx='24.5' cy='12' r='7' fill='%23F79E1B'/%3e%3cpath d='M20 7.59a6.99 6.99 0 000 8.82 6.99 6.99 0 000-8.82z' fill='%23FF5F00'/%3e%3c/svg%3e"
                                alt="Mastercard"
                                className="h-6"
                              />
                            </div>
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* PSE / Transferencia */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${paymentMethod === "bank" ? "ring-2 ring-green-500 border-green-300 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="bank"
                          id="bank"
                        />
                        <Label
                          htmlFor="bank"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 p-2 rounded-lg">
                                <Building2 className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  PSE / Transferencia Bancaria
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Todos los bancos de Colombia
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700"
                            >
                              Seguro
                            </Badge>
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Criptomonedas */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${paymentMethod === "crypto" ? "ring-2 ring-orange-500 border-orange-300 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="crypto"
                          id="crypto"
                        />
                        <Label
                          htmlFor="crypto"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-orange-100 p-2 rounded-lg">
                                <Bitcoin className="h-5 w-5 text-orange-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  Criptomonedas
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Bitcoin, Ethereum, USDT
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-700"
                            >
                              Instantáneo
                            </Badge>
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </RadioGroup>

              {/* Formulario */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={paymentMethod}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Lock className="h-4 w-4 text-green-600" />
                        {paymentMethod === "card" &&
                          "Datos de tu Tarjeta"}
                        {paymentMethod === "bank" &&
                          "Información Bancaria"}
                        {paymentMethod === "crypto" &&
                          "Configuración Crypto"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {paymentMethod === "card" && (
                        <div className="space-y-4">
                          <div>
                            <Label className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Número de Tarjeta
                            </Label>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              value={cardForm.number}
                              onChange={(e) => {
                                const formatted =
                                  formatCardNumber(
                                    e.target.value,
                                  );
                                if (
                                  formatted.replace(/\s/g, "")
                                    .length <= 16
                                ) {
                                  setCardForm((prev) => ({
                                    ...prev,
                                    number: formatted,
                                  }));
                                  if (errors.number)
                                    setErrors((prev) => ({
                                      ...prev,
                                      number: "",
                                    }));
                                }
                              }}
                              className={`mt-1 ${errors.number ? "border-red-500" : ""}`}
                              disabled={isProcessing}
                            />
                            {errors.number && (
                              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.number}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Vencimiento
                              </Label>
                              <Input
                                placeholder="MM/AA"
                                value={cardForm.expiry}
                                onChange={(e) => {
                                  const formatted =
                                    formatExpiry(
                                      e.target.value,
                                    );
                                  if (formatted.length <= 5) {
                                    setCardForm((prev) => ({
                                      ...prev,
                                      expiry: formatted,
                                    }));
                                    if (errors.expiry)
                                      setErrors((prev) => ({
                                        ...prev,
                                        expiry: "",
                                      }));
                                  }
                                }}
                                className={`mt-1 ${errors.expiry ? "border-red-500" : ""}`}
                                disabled={isProcessing}
                              />
                              {errors.expiry && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.expiry}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                CVV
                              </Label>
                              <div className="relative">
                                <Input
                                  type={
                                    showCvv
                                      ? "text"
                                      : "password"
                                  }
                                  placeholder="123"
                                  value={cardForm.cvv}
                                  onChange={(e) => {
                                    const value =
                                      e.target.value.replace(
                                        /\D/g,
                                        "",
                                      );
                                    if (value.length <= 4) {
                                      setCardForm((prev) => ({
                                        ...prev,
                                        cvv: value,
                                      }));
                                      if (errors.cvv)
                                        setErrors((prev) => ({
                                          ...prev,
                                          cvv: "",
                                        }));
                                    }
                                  }}
                                  className={`mt-1 pr-10 ${errors.cvv ? "border-red-500" : ""}`}
                                  disabled={isProcessing}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowCvv(!showCvv)
                                  }
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                  {showCvv ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              {errors.cvv && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.cvv}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <Label className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Titular de la Tarjeta
                            </Label>
                            <Input
                              placeholder="Como aparece en tu tarjeta"
                              value={cardForm.name}
                              onChange={(e) => {
                                setCardForm((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }));
                                if (errors.name)
                                  setErrors((prev) => ({
                                    ...prev,
                                    name: "",
                                  }));
                              }}
                              className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                              disabled={isProcessing}
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {paymentMethod === "bank" && (
                        <div className="space-y-4">
                          <div>
                            <Label>Banco</Label>
                            <select
                              value={bankForm.bank}
                              onChange={(e) => {
                                setBankForm((prev) => ({
                                  ...prev,
                                  bank: e.target.value,
                                }));
                                if (errors.bank)
                                  setErrors((prev) => ({
                                    ...prev,
                                    bank: "",
                                  }));
                              }}
                              className={`w-full mt-1 p-2 border rounded-md ${errors.bank ? "border-red-500" : "border-gray-300"}`}
                              disabled={isProcessing}
                            >
                              <option value="">
                                Selecciona tu banco
                              </option>
                              <option value="bancolombia">
                                Bancolombia
                              </option>
                              <option value="davivienda">
                                Davivienda
                              </option>
                              <option value="bbva">BBVA</option>
                              <option value="nequi">
                                Nequi
                              </option>
                              <option value="daviplata">
                                Daviplata
                              </option>
                            </select>
                            {errors.bank && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.bank}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label>Tipo de Cuenta</Label>
                            <RadioGroup
                              value={bankForm.accountType}
                              onValueChange={(value) =>
                                setBankForm((prev) => ({
                                  ...prev,
                                  accountType: value,
                                }))
                              }
                              className="flex gap-6 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="ahorros"
                                  id="ahorros"
                                />
                                <Label htmlFor="ahorros">
                                  Ahorros
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="corriente"
                                  id="corriente"
                                />
                                <Label htmlFor="corriente">
                                  Corriente
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>
                              Documento de Identificación
                            </Label>
                            <Input
                              placeholder="Número de cédula"
                              value={bankForm.identification}
                              onChange={(e) => {
                                const value =
                                  e.target.value.replace(
                                    /\D/g,
                                    "",
                                  );
                                setBankForm((prev) => ({
                                  ...prev,
                                  identification: value,
                                }));
                                if (errors.identification)
                                  setErrors((prev) => ({
                                    ...prev,
                                    identification: "",
                                  }));
                              }}
                              className={`mt-1 ${errors.identification ? "border-red-500" : ""}`}
                              disabled={isProcessing}
                            />
                            {errors.identification && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.identification}
                              </p>
                            )}
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-2">
                              <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-blue-900">
                                  Proceso PSE
                                </p>
                                <p className="text-sm text-blue-700 mt-1">
                                  Serás redirigido al portal
                                  seguro de tu banco para
                                  completar la transacción.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "crypto" && (
                        <div className="space-y-4">
                          <div>
                            <Label>Criptomoneda</Label>
                            <RadioGroup
                              value={cryptoForm.currency}
                              onValueChange={(value) =>
                                setCryptoForm((prev) => ({
                                  ...prev,
                                  currency: value,
                                }))
                              }
                              className="space-y-2 mt-2"
                            >
                              <div className="flex items-center space-x-2 p-2 border rounded-lg">
                                <RadioGroupItem
                                  value="BTC"
                                  id="btc"
                                />
                                <Label
                                  htmlFor="btc"
                                  className="flex items-center gap-2 flex-1 cursor-pointer"
                                >
                                  <Bitcoin className="h-4 w-4 text-orange-500" />
                                  <span>Bitcoin (BTC)</span>
                                  <Badge
                                    variant="outline"
                                    className="ml-auto"
                                  >
                                    Popular
                                  </Badge>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 p-2 border rounded-lg">
                                <RadioGroupItem
                                  value="ETH"
                                  id="eth"
                                />
                                <Label
                                  htmlFor="eth"
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <Wallet className="h-4 w-4 text-blue-500" />
                                  <span>Ethereum (ETH)</span>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 p-2 border rounded-lg">
                                <RadioGroupItem
                                  value="USDT"
                                  id="usdt"
                                />
                                <Label
                                  htmlFor="usdt"
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <QrCode className="h-4 w-4 text-green-500" />
                                  <span>Tether (USDT)</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>
                              Tu Dirección de Wallet
                            </Label>
                            <Input
                              placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                              value={cryptoForm.walletAddress}
                              onChange={(e) => {
                                setCryptoForm((prev) => ({
                                  ...prev,
                                  walletAddress: e.target.value,
                                }));
                                if (errors.walletAddress)
                                  setErrors((prev) => ({
                                    ...prev,
                                    walletAddress: "",
                                  }));
                              }}
                              className={`mt-1 font-mono text-sm ${errors.walletAddress ? "border-red-500" : ""}`}
                              disabled={isProcessing}
                            />
                            {errors.walletAddress && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.walletAddress}
                              </p>
                            )}
                          </div>

                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <div className="flex items-start gap-2">
                              <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-orange-900">
                                  Pago con {cryptoForm.currency}
                                </p>
                                <p className="text-sm text-orange-700 mt-1">
                                  Recibirás la dirección de
                                  nuestra wallet y el monto
                                  exacto a transferir.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Panel derecho - Resumen + Items */}
            <div className="w-full md:w-80 bg-gray-50 border-l border-gray-200 p-4 flex-shrink-0 overflow-y-auto order-last md:order-none">
              <div className="space-y-4">
                {/* Resumen de compra (total, iva, etc.) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Resumen de Compra
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Productos ({itemCount})</span>
                        <span>
                          ${(total * 0.84).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Impuestos (IVA)</span>
                        <span>
                          ${(total * 0.16).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Envío</span>
                        <span className="text-green-600">
                          Gratis
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-xl text-green-600">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-600" />
                        <span>Transacción segura SSL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-3 w-3 text-green-600" />
                        <span>Datos encriptados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-600" />
                        <span>Garantía de reembolso</span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {paymentStatus === "success" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center p-4 bg-green-50 rounded-lg border border-green-200"
                        >
                          <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="text-green-800 font-semibold">
                            ¡Pago Exitoso!
                          </p>
                          <p className="text-green-600 text-sm">
                            Redirigiendo...
                          </p>
                        </motion.div>
                      ) : (
                        <Button
                          onClick={handlePayment}
                          disabled={
                            isProcessing ||
                            paymentStatus === "processing"
                          }
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                        >
                          {isProcessing ? (
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              Procesando...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Pagar ${total.toLocaleString()}
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>

                {/* NUEVO: Items del Pedido (como el panel de la derecha del ejemplo) */}
                <Card className="border-purple-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Items del Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[46vh] overflow-y-auto pr-1 space-y-3">
                      {items.length === 0 ? (
                        <p className="text-xs text-gray-500">
                          No hay productos en el carrito.
                        </p>
                      ) : (
                        items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 py-1"
                          >
                            {/* miniatura */}
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                              {/* Si tu CartItem no tiene image, este <img> no rompe: */}
                              <img
                                src={(item as any).image || ""}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (
                                    e.currentTarget as HTMLImageElement
                                  ).style.display = "none";
                                }}
                              />
                            </div>

                            {/* info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-800 truncate">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-gray-500 truncate">
                                Cant: {item.quantity} • $
                                {item.price.toLocaleString()}{" "}
                                c/u
                              </p>
                            </div>

                            {/* total por ítem */}
                            <div className="text-sm font-semibold text-gray-900">
                              $
                              {(
                                item.price * item.quantity
                              ).toLocaleString()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}