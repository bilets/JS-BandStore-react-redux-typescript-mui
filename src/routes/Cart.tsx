import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBook,
  clearCart,
  decreaseQuantityBook,
  increaseQuantityBook,
} from '../redux/cart/actionCreators';
import { CartItem } from '../types/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import cartImg from '/images/cart.svg';


export default function Cart() {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

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

  const totalAll: number = cart.reduce(
    (sum: number, item: CartItem) => sum + item.count * item.price,
    0
  );

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantityBook(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantityBook(id));
  };

  const handleDeleteBook = (id: number) => {
    dispatch(deleteBook(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
              <TableCell colSpan={4} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    '&:hover': {
                      color: 'secondary.main',
                    },
                  }}
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Book Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Sum ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((book: CartItem, index: number) => (
              <TableRow key={book.id}>
                <TableCell>
                  {++index}. {book.title}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDecreaseQuantity(book.id)}
                    disabled={book.count === 1}
                  >
                    <RemoveCircleOutlineIcon
                      sx={{
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  </IconButton>
                  {book.count}
                  <IconButton onClick={() => handleIncreaseQuantity(book.id)}>
                    <AddCircleOutlineOutlinedIcon
                      sx={{
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDeleteBook(book.id)}>
                    <DeleteIcon
                      sx={{
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {(book.count * book.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={3}>
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
