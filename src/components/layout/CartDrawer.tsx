'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  /**
   * Initiates a Stripe Checkout session via the API route.
   * On success, redirects the user to the Stripe-hosted checkout page.
   */
  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        closeCart();
        router.push(data.url);
      } else {
        console.error('[CartDrawer] No checkout URL returned', data);
      }
    } catch (err) {
      console.error('[CartDrawer] Checkout error:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#111111] border-l border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-serif text-xl text-white">Carrito</h2>
              <button
                onClick={closeCart}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-white/20" />
                  <p className="text-white/40 font-sans">Tu carrito esta vacio</p>
                  <Button variant="secondary" size="sm" onClick={closeCart}>
                    Ver tienda
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.printSize}`} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-white/5">
                        {item.imagen && (
                          <Image
                            src={item.imagen}
                            alt={item.titulo}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm text-white truncate">{item.titulo}</p>
                        {item.printSize && (
                          <p className="text-xs text-white/40">Print {item.printSize.toUpperCase()}</p>
                        )}
                        <p className="text-sm text-accent mt-1">{formatPrice(item.precio)}</p>
                        {item.tipo === 'print' && (
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                              className="p-0.5 text-white/40 hover:text-white transition-colors"
                              aria-label="Reducir cantidad"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm text-white w-4 text-center">{item.cantidad}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                              className="p-0.5 text-white/40 hover:text-white transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1 text-white/30 hover:text-red-400 transition-colors"
                        aria-label={`Eliminar ${item.titulo}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-white/60">Total</span>
                  <span className="font-serif text-xl text-white">{formatPrice(getTotal())}</span>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Procesando...' : 'Finalizar compra'}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
