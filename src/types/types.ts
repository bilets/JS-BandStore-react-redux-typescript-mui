export type BookType = {
  id: number;
  author?: string;
  price: number;
  image?: string;
  title: string;
  shortDescription?: string;
  description?: string;
};

export type CartItem = {
  title: string;
  price: number;
  count: number;
  id: number;
};

export type HeaderProps = {
  username: string | null;
  resetUsername: () => void;
  searchBooksHandler: (bookName: string) => void;
  selectBooksHandler: (range: number) => void;
};

export type Action = {
  type: string;
  payload?: any;
};
