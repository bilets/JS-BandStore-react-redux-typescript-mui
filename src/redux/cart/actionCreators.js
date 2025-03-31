import * as a from './actionTypes';

export const addToCart = (book) => {
  return {
    type: a.ADD_TO_CART,
    payload: book,
  };
};

export const decreaseQuantityBook = (id) => {
  return {
    type: a.DECREASE_QUANTITY_BOOK,
    payload: id,
  };
};

export const increaseQuantityBook = (id) => {
  return {
    type: a.INCREASE_QUANTITY_BOOK,
    payload: id,
  };
};

export const deleteBook = (id) => {
  return {
    type: a.DELETE_BOOK,
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: a.CLEAR_CART,
  };
};
