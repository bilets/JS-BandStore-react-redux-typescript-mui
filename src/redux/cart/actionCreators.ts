import * as a from './actionTypes';
import { CartItem} from '../../types/types';

export const addToCart = (book: CartItem) => {
  return {
    type: a.ADD_TO_CART,
    payload: book,
  };
};

export const decreaseQuantityBook = (id: number) => {
  return {
    type: a.DECREASE_QUANTITY_BOOK,
    payload: id,
  };
};

export const increaseQuantityBook = (id: number) => {
  return {
    type: a.INCREASE_QUANTITY_BOOK,
    payload: id,
  };
};

export const deleteBook = (id: number) => {
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
