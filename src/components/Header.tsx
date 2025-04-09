import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cart/actionCreators';
import { HeaderProps } from '../types/types';
import { RootState } from '../redux/store';
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
import BookSearch from './BookSearch';
import BookSelect from './BookSelect';

export default function Header({
  username,
  resetUsername,
  searchBooksHandler,
  selectBooksHandler,
}: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const location = useLocation();

  const totalBooksInCart = cart.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0
  );

  const signOut = (): void => {
    navigate('/');
    resetUsername();
    dispatch(clearCart());
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
            <Typography variant="h4">JS BAND STORE</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Tooltip title="Back to Store" placement="bottom-start">
              <Typography
                variant="h4"
                onClick={() => navigate('/books')}
                sx={{
                  '&:hover': {
                    color: 'secondary.main',
                    cursor: 'pointer',
                  },
                }}
              >
                JS BAND STORE
              </Typography>
            </Tooltip>
            {location.pathname === '/books' && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  gap: 2,
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <BookSearch searchBooks={searchBooksHandler} />
                <BookSelect selectBooks={selectBooksHandler} />
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link to="/cart">
                <IconButton>
                  <ShoppingCartOutlinedIcon
                    fontSize="large"
                    sx={{
                      color: 'white',
                      '&:hover': {
                        color: 'secondary.main',
                      },
                    }}
                  />
                  <CartBadge
                    badgeContent={totalBooksInCart}
                    color="secondary"
                  />
                </IconButton>
              </Link>
              <Button
                color="inherit"
                onClick={signOut}
                sx={{
                  '&:hover': {
                    color: 'secondary.main',
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
