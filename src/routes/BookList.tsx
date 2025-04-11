import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectTitleFilter,
  selectPriceRange,
} from '../redux/slices/filterSlice.ts';
import { BookType } from '../types/types';
import booksData from '../data/books.json';
import Book from '../components/Book.tsx';
import Box from '@mui/material/Box';

export default function BookList() {
  const titleFilter = useSelector(selectTitleFilter);
  const priceRange = useSelector(selectPriceRange);

  const filteredBooks = useMemo(() => {
    return booksData.filter((book: BookType) => {
      const matchesTitle = book.title
        .toLowerCase()
        .includes(titleFilter.toLowerCase());
      const matchesPriceRange =
        priceRange === 1 ||
        (priceRange === 2 && book.price > 0 && book.price < 15) ||
        (priceRange === 3 && book.price > 15 && book.price < 30) ||
        (priceRange === 4 && book.price > 30);
      return matchesTitle && matchesPriceRange;
    });
  }, [booksData, titleFilter, priceRange]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ marginTop: 2, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: 8,
            gap: 2,
          }}
        >
          {filteredBooks.map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
