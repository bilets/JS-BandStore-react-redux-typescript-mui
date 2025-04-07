export interface BookType {
  id: number;
  author: string;
  price: number;
  image: string;
  title: string;
  shortDescription: string;
  description: string;
}

export interface CartItem {
  title: string;
  price: number;
  count: number;
  id: number;
}

export interface HeaderProps {
  username: string | null;
  resetUsername: () => void;
  searchBooksHandler: (bookName: string) => void;
  selectBooksHandler: (range: number) => void;
}

export interface Action {
  type: string;
  payload?: any;
}

// Тип для глобального стану (якщо потрібно)
export interface RootState {
  cart: CartItem[];
}

// Тип для користувача (якщо є аутентифікація)
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
