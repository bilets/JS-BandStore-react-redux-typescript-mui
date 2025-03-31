import * as a from './actionTypes';

const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_TO_CART:
      const updatedCart = state.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return {
            ...cartItem,
            count: cartItem.count + action.payload.count,
          };
        }
        return cartItem;
      });
      const itemExists = state.some(
        (cartItem) => cartItem.id === action.payload.id
      );
      return itemExists ? updatedCart : [...state, action.payload];

    case a.INCREASE_QUANTITY_BOOK:
      return state.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            count: cartItem.count + 1,
          };
        }
        return cartItem;
      });

    case a.DECREASE_QUANTITY_BOOK:
      return state.map((cartItem) => {
        if (cartItem.id === action.payload) {
          const newCount = cartItem.count > 1 ? cartItem.count - 1 : 1;
          return {
            ...cartItem,
            count: newCount,
          };
        }
        return cartItem;
      });

    case a.DELETE_BOOK:
      return state.filter((cartItem) => cartItem.id !== action.payload);

    case a.CLEAR_CART:
      return [];

    default:
      return state;
  }
};
