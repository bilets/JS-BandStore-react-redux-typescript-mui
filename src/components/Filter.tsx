import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setPriceRange,
  selectTitleFilter,
  selectPriceRange,
} from '../redux/slices/filterSlice';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export default function Filter() {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const priceRange = useSelector(selectPriceRange);

  const handleTitleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handlePriceRangeChange = (e: SelectChangeEvent<number>) => {
    dispatch(setPriceRange(Number(e.target.value)));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2,
        mt: { xs: 2, sm: 0 },
      }}
    >
      <TextField
        sx={{ bgcolor: 'white', m: 1, minWidth: 200 }}
        type="search"
        label="Search Book"
        size="small"
        variant="standard"
        value={titleFilter}
        onChange={handleTitleFilterChange}
      />

      <FormControl
        fullWidth
        variant="standard"
        sx={{ bgcolor: 'white', m: 1, minWidth: 200 }}
      >
        <InputLabel id="book-select-label">Select Book</InputLabel>
        <Select
          labelId="book-select-label"
          value={priceRange}
          onChange={handlePriceRangeChange}
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
    </Box>
  );
}
