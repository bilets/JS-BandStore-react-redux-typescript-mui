import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = [] as number[];

const favoriteBooksSlice = createSlice({
  name: 'favoriteBooks',
  initialState,
  reducers: {
    addFavoriteBook: (state, action) => {
      state.push(action.payload);
    },
    deleteFavoriteBook: (state, action) => {
      return state.filter((id) => id !== action.payload);
    },
    resetFavoriteBooks: () => {
      return initialState;
    },
  },
});

export const { addFavoriteBook, deleteFavoriteBook, resetFavoriteBooks } =
  favoriteBooksSlice.actions;

export const selectFavoriteBooks = (state: RootState): number[] =>
  state.favoriteBooks;

export default favoriteBooksSlice.reducer;
