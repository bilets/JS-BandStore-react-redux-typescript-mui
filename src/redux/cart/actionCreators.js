import * as a from './actionTypes';

export const addToCartR = (book) => {
    
  return {
    type: a.ADD_TO_CART,
    payload: book,
  };
};
