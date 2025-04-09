import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import { BookType } from '../types/types';
import { CartItem } from '../types/types';
import NotFoundPage from './NotFoundPage.tsx';
import Form from '../components/Form.tsx';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from '@mui/material';
import booksData from '../data/books.json';
import imageNotFound from '/images/imageNotFound.png';

export default function SpecificBook() {
  const cart = useSelector((state: RootState) => state.cart);
  const { title } = useParams<{ title: string }>();

  const book = booksData.find((book: BookType) => book.title === title);

  const bookInCartCount =
    cart.find((bookInCart: CartItem) => bookInCart.title === title)?.count || 0;

  if (!book) {
    return <NotFoundPage />;
  }

  return (
    <Box
      sx={{
        p: 1,
        pt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          marginBottom: 2,
          width: '100%',
          maxWidth: 1100,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: 300 },
            height: { xs: 'auto', sm: '100%' },
          }}
          image={book.image ? book.image : imageNotFound}
          alt={book.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Book in cart: {bookInCartCount}
          </Typography>
          <Form title={book.title} price={book.price} id={book.id} />
        </CardContent>
      </Card>
      <Container sx={{ marginTop: 2, width: '100%', maxWidth: 800 }}>
        <Typography variant="subtitle1" component="div">
          Description:
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {book.description}
        </Typography>
      </Container>
    </Box>
  );
}
