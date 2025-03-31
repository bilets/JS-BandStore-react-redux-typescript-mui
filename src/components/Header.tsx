import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cart/actionCreators';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


interface HeaderProps {
  username: string | null;
  resetUsername: () => void;
}

export default function Header({ username, resetUsername }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const totalBooksInCart = cart.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0
  );

  const signOut = (): void => {
    navigate('/');
    resetUsername();
    dispatch(clearCart()); // Clear the cart when signing out
  };

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  if (!username) {
    return (
      <Box>
        <AppBar>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              JS BAND STORE
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Tooltip title="Back to Store" placement="bottom-start">
            <Typography
              variant="h4"
              component="div"
              onClick={() => navigate('/books')}
              sx={{
                flexGrow: 1,
                '&:hover': {
                  color: 'red',
                  cursor: 'pointer',
                },
              }}
            >
              JS BAND STORE
            </Typography>
          </Tooltip>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to="/cart">
              <IconButton>
                <ShoppingCartOutlinedIcon
                  fontSize="large"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      color: 'red',
                    },
                  }}
                />
                <CartBadge badgeContent={totalBooksInCart} color="primary" />
              </IconButton>
            </Link>
            <Button
              color="inherit"
              onClick={signOut}
              sx={{
                '&:hover': {
                  color: 'red',
                },
              }}
            >
              Sign-out
            </Button>
            <AccountCircleIcon fontSize="large" />
            <Typography variant="body1" color="inherit">
              {username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
