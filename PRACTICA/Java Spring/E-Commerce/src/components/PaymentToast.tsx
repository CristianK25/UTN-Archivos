import { motion } from 'motion/react';
import { Check, CreditCard, ShoppingCart, X } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from "sonner@2.0.3";

interface PaymentToastProps {
  productName: string;
  onPayNow: () => void;
  onViewCart: () => void;
  total: number;
  itemCount: number;
}

export const createPaymentToast = ({ 
  productName, 
  onPayNow, 
  onViewCart, 
  total, 
  itemCount 
}: PaymentToastProps) => {
  return toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.8 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-md w-full"
      >
        <div className="flex items-start gap-3">
          <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">¡Producto agregado!</h4>
                <p className="text-sm text-gray-600 truncate">{productName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.dismiss(t)}
                className="p-1 h-auto hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span>{itemCount} productos</span>
              <span className="font-bold text-green-600">${total.toLocaleString()}</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  onViewCart();
                  toast.dismiss(t);
                }}
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Ver Carrito
              </Button>
              
              <Button
                onClick={() => {
                  onPayNow();
                  toast.dismiss(t);
                }}
                size="sm"
                className="flex-1 h-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs"
              >
                <CreditCard className="h-3 w-3 mr-1" />
                Pagar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    ),
    {
      duration: 4000,
      position: 'bottom-right',
    }
  );
};