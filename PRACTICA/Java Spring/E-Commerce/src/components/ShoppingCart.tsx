import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  X,
  CreditCard,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (
    productId: string,
    quantity: number,
  ) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void; // <- se mantiene por compatibilidad
  onDirectPayment?: () => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout: _onCheckout, // <- renombrada para no usarse
  onDirectPayment,
}: ShoppingCartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="
          w-full sm:max-w-md
          !p-0 !flex !flex-col
          !h-dvh sm:!h-screen
          !overflow-hidden
        "
      >
        <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 shrink-0">
          <SheetTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Carrito de Compras
              </h2>
              {itemCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {itemCount}{" "}
                  {itemCount === 1 ? "producto" : "productos"}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-muted-foreground text-lg mb-2">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-gray-500">
                  Agrega productos para comenzar tu compra
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ÚNICA zona con scroll */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg border border-gray-100"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-2">
                            <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500 mb-1">
                              {item.brand}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-bold text-green-600">
                                ${item.price.toLocaleString()}
                              </p>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  $
                                  {item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              onRemoveItem(item.id)
                            }
                            className="text-gray-400 hover:text-red-500 p-1 shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.id,
                                  Math.max(
                                    0,
                                    item.quantity - 1,
                                  ),
                                )
                              }
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-base font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                )
                              }
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Subtotal
                            </p>
                            <p className="font-bold text-gray-900">
                              $
                              {(
                                item.price * item.quantity
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer fijo */}
              <div className="border-t bg-gray-50 p-6 space-y-4 shrink-0">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({itemCount}{" "}
                      {itemCount === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium text-green-600">
                      Gratis
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-green-600">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Solo “Pagar Ahora” */}
                {onDirectPayment && (
                  <Button
                    onClick={onDirectPayment}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                    size="lg"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pagar Ahora
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}