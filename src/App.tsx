import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './routes/MainLayout.tsx';
import SignIn from './routes/SignIn.tsx';
import BookList from './routes/BookList.tsx';
import SpecificBook from './routes/SpecificBook.tsx';
import Cart from './routes/Cart.tsx';
import NotFoundPage from './routes/NotFoundPage.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

export default function App() {
  const [username, setUsername] = useState<string>(
    localStorage.getItem('username') || ''
  );

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const addUsernameHandler = (username: string) => {
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const resetUsernameHandler = () => {
    setUsername('');
    localStorage.removeItem('username');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />

      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                username={username}
                resetUsername={resetUsernameHandler}
                toggleTheme={toggleTheme}
                isDarkTheme={isDarkTheme}
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
              element={username ? <SpecificBook /> : <Navigate to="/" />}
            />
            <Route
              path="cart"
              element={username ? <Cart /> : <Navigate to="/" />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
