import { createContext } from 'react';

export interface CartItem {
  title: string;
  count: number;
  total: number;
}

const CartContext = createContext<CartItem[]>([]);

export default CartContext;
