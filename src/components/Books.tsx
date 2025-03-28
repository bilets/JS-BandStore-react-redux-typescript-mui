import Book from './Book.tsx';
import Box from '@mui/material/Box';

interface BookType {
  id: number;
  author: string;
  price: number;
  image: string;
  title: string;
  shortDescription: string;
  description: string;
}

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
