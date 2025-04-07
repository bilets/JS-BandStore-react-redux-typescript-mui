import { BookType } from '../types/types';
import Book from './Book.tsx';
import Box from '@mui/material/Box';

interface BooksProps {
  books: BookType[];
}

export default function Books({ books }: BooksProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '70px',
        gap: 2,
      }}
    >
      {books.map((book) => (
        <Book key={book.id} {...book} />
      ))}
    </Box>
  );
}
