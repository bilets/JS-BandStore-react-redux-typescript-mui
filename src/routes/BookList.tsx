import { useState, useContext, useMemo } from 'react';
import BooksContext, { BookType } from '../context/BooksContext.ts';
import BookSearch from '../components/BookSearch.tsx';
import BookSelect from '../components/BookSelect.tsx';
import Books from '../components/Books.tsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function BookList() {
  const BOOKS = useContext(BooksContext);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number>(1);

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book: BookType) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriceRange = (() => {
        if (selectedPriceRange === 1) return true;
        if (selectedPriceRange === 2) return book.price > 0 && book.price < 15;
        if (selectedPriceRange === 3) return book.price > 15 && book.price < 30;
        if (selectedPriceRange === 4) return book.price > 30;
        return false;
      })();
      return matchesSearch && matchesPriceRange;
    });
  }, [BOOKS, searchTerm, selectedPriceRange]);

  const searchBooksHandler = (term: string): void => {
    setSearchTerm(term);
  };

  const selectBooksHandler = (range: number): void => {
    setSelectedPriceRange(range);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Toolbar sx={{ position: 'fixed', zIndex: 'modal', top: 0 }}>
        <BookSearch searchBooks={searchBooksHandler} />
        <BookSelect selectBooks={selectBooksHandler} />
      </Toolbar>

      <Box sx={{ marginTop: '10px', width: '100%' }}>
        <Books books={filteredBooks} />
      </Box>
    </Box>
  );
}
