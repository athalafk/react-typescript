import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types';

interface ProductState {
  allProducts: Product[];
  selectedProduct: Product | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  allProducts: [],
  selectedProduct: null,
  loading: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk<Product, string>(
  'products/fetchProductById',
  async (id) => {
    const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export default productSlice.reducer;