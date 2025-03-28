import { useState, ChangeEvent } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

interface FormProps {
  addToCart: (item: { title: string; count: number; total: number }) => void;
  title: string;
  price: number;
  bookInCartCountHandler: (count: number) => void;
}

export default function Form({
  addToCart,
  title,
  price,
  bookInCartCountHandler,
}: FormProps) {
  const [count, setCount] = useState<number>(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCount(Math.max(1, Math.min(value, 42)));
    } else {
      setCount(1);
    }
  };

  const handleClick = () => {
    const total = price * count;
    addToCart({ title, count, total });
    bookInCartCountHandler(count);
    setCount(1); // Скидання після додавання
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
            onChange={handleChange}
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
          onClick={handleClick}
          fullWidth
        >
          Add to cart
        </Button>
      </Box>
    </Box>
  );
}
