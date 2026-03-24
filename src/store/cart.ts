import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.id === item.id && i.printSize === item.printSize
        );
        if (existing) {
          // Original artworks: don't increase quantity (unique pieces)
          if (item.tipo === 'original') return;
          set({
            items: items.map((i) =>
              i.id === item.id && i.printSize === item.printSize
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, cantidad } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.cantidad, 0),
    }),
    {
      name: 'luli-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
