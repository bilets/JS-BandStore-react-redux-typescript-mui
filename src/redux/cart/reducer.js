import * as a from './actionTypes';

const initialState = [];

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case a.ADD_TO_CART:
            return [...state, action.payload];
        default:
            return state;
    }
};