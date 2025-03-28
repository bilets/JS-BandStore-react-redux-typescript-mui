import { useNavigate } from 'react-router-dom';
import imageNotFound from '../images/imageNotFound.png';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface BookProps {
  id: number;
  author: string;
  price: number;
  image: string;
  title: string;
  shortDescription: string;
}

const MAX_TITLE_LENGTH = 60; // Maximum length of the title

export default function Book({
  author,
  price,
  image,
  title,
  shortDescription,
}: BookProps) {
  const navigate = useNavigate();

  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.slice(0, MAX_TITLE_LENGTH)}...`
      : title;

  const handleViewClick = () => {
    navigate(title);
  };

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
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
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
        <Typography>
          price: <b>{price} $</b>
        </Typography>
        <Button size="large" color="secondary" onClick={handleViewClick}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
