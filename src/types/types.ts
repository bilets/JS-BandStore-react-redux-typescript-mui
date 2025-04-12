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
  toggleTheme?: () => void;
  isDarkTheme?: boolean;
};

export type Action = {
  type: string;
  payload?: any;
};
