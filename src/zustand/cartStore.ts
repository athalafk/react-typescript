import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
  data: CartItem[];
  addToCart: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      data: [],
      addToCart: (product) => {
        const { data } = get();
        const existingItem = data.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            data: data.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            ),
          });
        } else {
          set({ data: [...data, { ...product, qty: 1 }] });
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          data: state.data.filter((item) => item.id !== productId),
        }));
      },
      clearCart: () => {
        set({ data: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);