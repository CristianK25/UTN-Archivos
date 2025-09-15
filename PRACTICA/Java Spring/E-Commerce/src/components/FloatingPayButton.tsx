import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FloatingPayButtonProps {
  itemCount: number;
  total: number;
  onPayNow: () => void;
  onViewCart: () => void;
  isVisible: boolean;
}

export function FloatingPayButton({ 
  itemCount, 
  total, 
  onPayNow, 
  onViewCart,
  isVisible 
}: FloatingPayButtonProps) {
  return (
    <AnimatePresence>
      {isVisible && itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white rounded-full shadow-2xl border border-gray-200 p-2 flex items-center gap-2">
            {/* Ver Carrito */}
            <Button
              onClick={onViewCart}
              variant="outline"
              size="sm"
              className="rounded-full h-12 px-4 border-gray-300 hover:bg-gray-50 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500"
              >
                {itemCount}
              </Badge>
            </Button>

            {/* Separador */}
            <div className="h-6 w-px bg-gray-300" />

            {/* Pagar Ahora */}
            <Button
              onClick={onPayNow}
              className="rounded-full h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105 transition-transform"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold">Pagar</span>
                <span className="text-xs opacity-90">${total.toLocaleString()}</span>
              </div>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}