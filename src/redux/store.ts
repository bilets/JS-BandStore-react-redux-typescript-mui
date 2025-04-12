import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart/reducer';
import filterReducer from './slices/filterSlice';
import favoriteBooksReducer from './slices/favoriteBooksSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    favoriteBooks: favoriteBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
