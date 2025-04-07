import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/actionCreators';
import { BookType} from '../types/types';
import { Box, TextField, Typography, Button } from '@mui/material';


export default function Form({ title, price, id }: BookType) {
  const [count, setCount] = useState<number>(1);
  const dispatch = useDispatch();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCount(Math.max(1, Math.min(value, 42)));
    } else {
      setCount(1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ title, count, price, id }));
    setCount(1);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: '1 1 30%' }}>
          <Typography variant="body1" gutterBottom>
            Price, $
          </Typography>
          <Typography variant="body2">{price.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ flex: '1 1 30%' }}>
          <TextField
            label="Count"
            type="number"
            value={count}
            onChange={onChangeHandler}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: '1 1 30%' }}>
          <Typography variant="body1" gutterBottom>
            Total price, $
          </Typography>
          <Typography variant="body2">{(price * count).toFixed(2)}</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={addToCartHandler}
          fullWidth
        >
          Add to cart
        </Button>
      </Box>
    </Box>
  );
}
