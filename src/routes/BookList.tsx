import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectTitleFilter,
  selectPriceRangeFilter,
  selectOnlyFavoriteFilter,
} from '../redux/slices/filterSlice.ts';
import { selectFavoriteBooks } from '../redux/slices/favoriteBooksSlice';
import { BookType } from '../types/types';
import booksData from '../data/books.json';
import Book from '../components/Book.tsx';
import Box from '@mui/material/Box';

export default function BookList() {
  const titleFilter = useSelector(selectTitleFilter);
  const priceRange = useSelector(selectPriceRangeFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const favoriteBooks = useSelector(selectFavoriteBooks);

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
      const matchesFavorite = onlyFavoriteFilter
        ? favoriteBooks.includes(book.id)
        : true;
      return matchesTitle && matchesPriceRange && matchesFavorite;
    });
  }, [booksData, titleFilter, priceRange, onlyFavoriteFilter, favoriteBooks]);

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
