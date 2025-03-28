import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import CartContext, { CartItem } from './context/CartContext.ts';
import MainLayout from './routes/MainLayout.tsx';
import SignIn from './routes/SignIn.tsx';
import BookList from './routes/BookList.tsx';
import SpecificBook from './routes/SpecificBook.tsx';
import Cart from './routes/Cart.tsx';
import NotFoundPage from './routes/NotFoundPage.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addUsernameHandler = (username: string) => {
    setUsername(username);
  };

  const resetUsernameHandler = () => {
    setUsername('');
  };

  const addToCartHandler = (item: CartItem) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.title === item.title) {
        return {
          ...cartItem,
          count: cartItem.count + item.count,
          total: cartItem.total + item.total,
        };
      }
      return cartItem;
    });

    const itemExists = cart.some((cartItem) => cartItem.title === item.title);
    setCart(itemExists ? updatedCart : [...cart, item]);
  };

  const resetCartHandler = () => {
    setCart([]);
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#212121',
      },
      secondary: {
        main: '#0276aa',
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <CartContext.Provider value={cart}>
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout
                  username={username}
                  resetUsername={resetUsernameHandler}
                  resetCart={resetCartHandler}
                />
              }
            >
              <Route
                index
                element={<SignIn addUsername={addUsernameHandler} />}
              />
              <Route
                path="books"
                element={username ? <BookList /> : <Navigate to="/" />}
              />
              <Route
                path="books/:title"
                element={
                  username ? (
                    <SpecificBook addToCart={addToCartHandler} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="cart"
                element={
                  username ? (
                    <Cart resetCart={resetCartHandler} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </CartContext.Provider>
    </ThemeProvider>
  );
}
