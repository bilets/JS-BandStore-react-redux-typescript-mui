import { BookType } from '../types/types';
import Books from '../components/Books.tsx';
import Box from '@mui/material/Box';


export default function BookList({
  filteredBooks,
}: {
  filteredBooks: BookType[];
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ marginTop: '10px', width: '100%' }}>
        <Books books={filteredBooks} />
      </Box>
    </Box>
  );
}
