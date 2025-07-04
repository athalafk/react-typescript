import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductDetailModal from '../components/Fragments/ProductDetailModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { fetchProductById } from '@/api/products';
import { Product } from '@/types';

// -- SETUP AWAL & MOCKING --

// 1. Mock the API module:
vi.mock('@/api/products');

// 2. Type Definitions and Middleware Configuration for the Redux Mock Store.
type RootState = {
  cart: { items: [] };
  notification: { message: null; type: 'info'; open: false };
};

// 3. Create a "factory" for the mock store with the configured middleware.
const middlewares = [thunk];
// @ts-expect-error: redux-mock-store has type conflicts with redux-thunk middleware
const mockStore = configureStore<RootState>(middlewares);
const initialState: RootState = { 
  cart: { items: [] }, 
  notification: { message: null, type: 'info', open: false } 
};
let store: ReturnType<typeof mockStore>;

// 4. Mock Product Data: A consistent product object to be used across all tests.
const mockProduct: Product = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: { rate: 3.9, count: 120 }
};

// 5. Query Client Helper: This function creates a new QueryClient instance for each test.
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

// 6. Render Helper Function: Wraps the component with all the necessary providers (Redux & React Query).
const renderModal = (productId: number | null, client: QueryClient, onClose = vi.fn()) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ProductDetailModal productId={productId} onClose={onClose} />
      </QueryClientProvider>
    </Provider>
  );
};

// -- TESTING BLOCK --

describe('ProductDetailModal Component', () => {

  beforeEach(() => {
    store = mockStore(initialState);
    vi.clearAllMocks();
  });

  it('should not render when productId is null', () => {
    const queryClient = createTestQueryClient();
    renderModal(null, queryClient);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should display a loading indicator while fetching data', () => {
    (fetchProductById as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));

    const queryClient = createTestQueryClient();
    renderModal(1, queryClient);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

   it('should display an error message if data fetching fails', async () => {
    const errorMessage = 'Failed to fetch';
    (fetchProductById as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage));

    const queryClient = createTestQueryClient();
    renderModal(1, queryClient);

    expect(await screen.findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should display product details when data is fetched successfully', async () => {
    (fetchProductById as ReturnType<typeof vi.fn>).mockResolvedValue(mockProduct);

    const queryClient = createTestQueryClient();
    renderModal(1, queryClient);

    expect(await screen.findByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('should dispatch addToCart and showNotification actions when "Add to Cart" is clicked', async () => {
    (fetchProductById as ReturnType<typeof vi.fn>).mockResolvedValue(mockProduct);
    const queryClient = createTestQueryClient();
    renderModal(1, queryClient);
    
    const addToCartButton = await screen.findByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addToCartButton);

    const actions = store.getActions();

    expect(actions).toHaveLength(2);

    expect(actions[0]).toEqual({
      type: 'cart/addToCart',
      payload: mockProduct
    });

    expect(actions[1]).toEqual({
      type: 'notification/setNotification',
      payload: {
        message: `Successfully added "${mockProduct.title.substring(0, 20)}..." to cart`,
        type: 'success'
      }
    });
  });
});