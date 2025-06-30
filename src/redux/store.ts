import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/features/cartSlice';
import notificationReducer from '@/redux/features/notificationSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;