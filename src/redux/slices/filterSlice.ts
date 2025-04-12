import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  title: '',
  priceRange: 1,
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    setPriceRangeFilter: (state, action) => {
      state.priceRange = action.payload;
    },
    setOnlyFavoriteFilter: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setTitleFilter, setPriceRangeFilter, setOnlyFavoriteFilter, resetFilters } =
  filterSlice.actions;

export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectPriceRangeFilter = (state: RootState) => state.filter.priceRange;
export const selectOnlyFavoriteFilter = (state: RootState) => state.filter.onlyFavorite;

export default filterSlice.reducer;
