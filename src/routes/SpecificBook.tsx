import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import BooksContext, { BookType } from '../context/BooksContext.ts';
import CartContext, { CartItem } from '../context/CartContext.ts';
import NotFoundPage from './NotFoundPage.tsx';
import imageNotFound from '../images/imageNotFound.png';
import Form from '../components/Form.tsx';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from '@mui/material';

interface SpecificBookProps {
  addToCart: (item: CartItem) => void;
}

export default function SpecificBook({ addToCart }: SpecificBookProps) {
  const books = useContext(BooksContext);
  const cart = useContext(CartContext);
  const { title } = useParams<{ title: string }>();

  const book = books.find((book: BookType) => book.title === title);

  const [bookInCartCount, setBookInCartCount] = useState<number>(
    cart.find((bookInCart: CartItem) => bookInCart.title === title)?.count || 0
  );

  const bookInCartCountHandler = (count: number) =>
    setBookInCartCount(bookInCartCount + count);

  if (!book) {
    return <NotFoundPage />;
  }

  return (
    <Box sx={{ p: 1, pt: 10 }}>
      <Card sx={{ display: 'flex', marginBottom: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
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
          <Form
            addToCart={addToCart}
            title={book.title}
            price={book.price}
            bookInCartCountHandler={bookInCartCountHandler}
          />
        </CardContent>
      </Card>
      <Container sx={{ marginTop: 2 }}>
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
