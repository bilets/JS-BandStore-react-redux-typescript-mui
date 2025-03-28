import { useEffect, useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface BookSearchProps {
  searchBooks: (bookName: string) => void;
}

export default function BookSearch({ searchBooks }: BookSearchProps) {
  const [bookName, setBookName] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };

  useEffect(() => {
    searchBooks(bookName);
  }, [bookName]);

  return (
    <TextField
      sx={{ bgcolor: 'white', m: 1, minWidth: 200 }}
      type="search"
      label="Search Book"
      size="small"
      variant="standard"
      value={bookName}
      onChange={handleSearchChange}
    />
  );
}
