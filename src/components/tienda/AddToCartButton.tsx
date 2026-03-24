'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import type { CartItem } from '@/types';

interface AddToCartButtonProps {
  item: CartItem;
  disabled?: boolean;
  className?: string;
}

export function AddToCartButton({ item, disabled, className }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={disabled || added}
      className={className}
      size="lg"
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check size={18} />
            Agregado
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Agregar al carrito
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
