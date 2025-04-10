import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import MainLayout from './routes/MainLayout.tsx';
import SignIn from './routes/SignIn.tsx';
import BookList from './routes/BookList.tsx';
import SpecificBook from './routes/SpecificBook.tsx';
import Cart from './routes/Cart.tsx';
import NotFoundPage from './routes/NotFoundPage.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BookType } from './types/types';
import booksData from './data/books.json';
import defaultTheme from './theme';

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number>(1);

  const addUsernameHandler = (username: string) => {
    setUsername(username);
  };

  const resetUsernameHandler = () => {
    setUsername('');
  };

  const filteredBooks = useMemo(() => {
    return booksData.filter((book: BookType) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriceRange =
        selectedPriceRange === 1 ||
        (selectedPriceRange === 2 && book.price > 0 && book.price < 15) ||
        (selectedPriceRange === 3 && book.price > 15 && book.price < 30) ||
        (selectedPriceRange === 4 && book.price > 30);
      return matchesSearch && matchesPriceRange;
    });
  }, [booksData, searchTerm, selectedPriceRange]);

  const searchBooksHandler = (term: string): void => {
    setSearchTerm(term);
  };

  const selectBooksHandler = (range: number): void => {
    setSelectedPriceRange(range);
  };

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
                searchBooksHandler={searchBooksHandler}
                selectBooksHandler={selectBooksHandler}
              />
            }
          >
            <Route
              index
              element={<SignIn addUsername={addUsernameHandler} />}
            />
            <Route
              path="books"
              element={
                username ? (
                  <BookList filteredBooks={filteredBooks} />
                ) : (
                  <Navigate to="/" />
                )
              }
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
