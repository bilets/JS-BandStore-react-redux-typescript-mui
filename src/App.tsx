import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './routes/MainLayout.tsx';
import SignIn from './routes/SignIn.tsx';
import BookList from './routes/BookList.tsx';
import SpecificBook from './routes/SpecificBook.tsx';
import Cart from './routes/Cart.tsx';
import NotFoundPage from './routes/NotFoundPage.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

export default function App() {
  const [username, setUsername] = useState<string>('');

  const addUsernameHandler = (username: string) => {
    setUsername(username);
  };

  const resetUsernameHandler = () => {
    setUsername('');
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

      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                username={username}
                resetUsername={resetUsernameHandler}
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
