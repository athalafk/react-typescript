import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/redux/store';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

interface NotificationPayload {
  message: string;
  type?: 'success' | 'error';
}

const initialState: NotificationState = {
  message: '',
  type: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'success';
    },
    clearNotification: (state) => {
      state.message = '';
      state.type = 'success';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (payload: NotificationPayload, timeout = 2000) => (dispatch: AppDispatch) => {
  dispatch(setNotification(payload));
  setTimeout(() => {
    dispatch(clearNotification());
  }, timeout);
};

export default notificationSlice.reducer;