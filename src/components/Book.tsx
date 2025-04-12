import { useNavigate } from 'react-router-dom';
import { BookType } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteBook,
  deleteFavoriteBook,
  selectFavoriteBooks,
} from '../redux/slices/favoriteBooksSlice';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import imageNotFound from '/images/imageNotFound.png';

const MAX_TITLE_LENGTH = 60;

export default function Book({
  author,
  price,
  image,
  title,
  shortDescription,
  id,
}: BookType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectFavoriteBooks).includes(id);

  const handleViewBook = () => {
    navigate(title);
  };

  const handleFavoriteBook = () => {
    dispatch(isFavorite ? deleteFavoriteBook(id) : addFavoriteBook(id));
  };

  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.slice(0, MAX_TITLE_LENGTH)}...`
      : title;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 290,
        m: 1,
      }}
    >
      <CardMedia
        component="img"
        height="380"
        image={image || imageNotFound}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {truncatedTitle}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          author: <b>{author}</b>
        </Typography>
      </CardContent>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {shortDescription}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            price: <b>{price} $</b>
          </Typography>
          <IconButton onClick={handleFavoriteBook}>
            <FavoriteIcon color={isFavorite ? 'secondary' : 'inherit'} />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            '&:hover': {
              color: 'secondary.main',
            },
          }}
          onClick={handleViewBook}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
