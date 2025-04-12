import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setPriceRangeFilter,
  selectTitleFilter,
  selectPriceRangeFilter,
} from '../redux/slices/filterSlice';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material';

export default function Filter() {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const priceRange = useSelector(selectPriceRangeFilter);
  const theme = useTheme();

  const handleTitleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handlePriceRangeChange = (e: SelectChangeEvent<number>) => {
    dispatch(setPriceRangeFilter(Number(e.target.value)));
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
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          minWidth: 200,
          '& .MuiInputBase-input': {
            color: theme.palette.text.primary,
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
          },
        }}
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
        sx={{
          bgcolor: theme.palette.background.paper,
          m: 1,
          minWidth: 200,
          '& .MuiInputBase-input': {
            color: theme.palette.text.primary,
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
          },
        }}
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
