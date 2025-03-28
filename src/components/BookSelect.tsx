import { useEffect, useState} from 'react';
import { Select, MenuItem, FormControl, InputLabel,SelectChangeEvent } from '@mui/material';

interface BookSelectProps {
  selectBooks: (selectedValue: number) => void;
}

export default function BookSelect({ selectBooks }: BookSelectProps) {
  const [bookSelect, setBookSelect] = useState<number>(1);

  useEffect(() => {
    selectBooks(bookSelect);
  }, [bookSelect, selectBooks]);

 const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setBookSelect(Number(e.target.value)); 
  };

  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={{ bgcolor: 'white', m: 1, minWidth: 200 }}
    >
      <InputLabel id="book-select-label">Select Book</InputLabel>
      <Select
        labelId="book-select-label"
        value={bookSelect}
        onChange={handleSelectChange}
        label="Select Book"
      >
        <MenuItem value={1}>All</MenuItem>
        <MenuItem value={2}>
          0 {'<'} price {'<'} 15
        </MenuItem>
        <MenuItem value={3}>
          15 {'<'} price {'<'} 30
        </MenuItem>
        <MenuItem value={4}>price {'>'} 30</MenuItem>
      </Select>
    </FormControl>
  );
}
