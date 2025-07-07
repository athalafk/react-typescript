import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem } from 'src/types';

interface CartState {
  data: CartItem[];
}

const initialState: CartState = {
  data: JSON.parse(localStorage.getItem("cart") || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.data.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.data.push({ ...product, qty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.data = state.data.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    clearCart: (state) => {
      state.data = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;