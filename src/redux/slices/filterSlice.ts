import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  title: '',
  priceRange: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setTitleFilter, setPriceRange, resetFilters } =
  filterSlice.actions;

export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectPriceRange = (state: RootState) => state.filter.priceRange;

export default filterSlice.reducer;
