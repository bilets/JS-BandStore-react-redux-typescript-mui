import { useContext } from 'react';
import CartContext, { CartItem } from '../context/CartContext.ts';
import cartImg from '../images/cart.svg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography } from '@mui/material';

interface CartProps {
  resetCart: () => void;
}

export default function Cart({ resetCart }: CartProps) {
  const cart = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <img
          src={cartImg}
          alt="Cart"
          style={{ width: '150px', marginBottom: '16px' }}
        />
        <Typography variant="h6">Cart is empty...</Typography>
      </Box>
    );
  }

  const totalAll = cart.reduce((sum, item: CartItem) => sum + item.total, 0);
    

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
        <Table sx={{ minWidth: 700 }} aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={cart.length === 0}
                  onClick={resetCart}
                >
                  Purchase
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Book Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Sum ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((book: CartItem) => (
              <TableRow key={book.title}>
                <TableCell>{book.title}</TableCell>
                <TableCell align="right">{book.count}</TableCell>
                <TableCell align="right">{book.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total, $
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  {totalAll.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
