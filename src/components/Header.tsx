import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cart/actionCreators';
import {
  setOnlyFavoriteFilter,
  selectOnlyFavoriteFilter,
  resetFilters,
} from '../redux/slices/filterSlice';
import { HeaderProps } from '../types/types';
import { RootState } from '../redux/store';
import {
  selectFavoriteBooks,
  resetFavoriteBooks,
} from '../redux/slices/favoriteBooksSlice';
import Filter from './Filter';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  Checkbox,
} from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Header({ username, resetUsername }: HeaderProps) {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const favoriteBooksQuantity = useSelector(selectFavoriteBooks).length;
  const location = useLocation();

  const totalBooksInCart = cart.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0
  );

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  const signOut = (): void => {
    navigate('/');
    resetUsername();
    dispatch(clearCart());
    dispatch(resetFilters());
    dispatch(resetFavoriteBooks());
  };

  const FavoriteBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: 8px;
      right: 10px;
    }
  `;

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
            {location.pathname === '/books' && <Filter />}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {location.pathname === '/books' && (
                <Tooltip title="Favorite">
                  <FavoriteBadge
                    badgeContent={favoriteBooksQuantity}
                    color="secondary"
                  >
                    <Checkbox
                      icon={
                        <FavoriteBorderIcon
                          fontSize="large"
                          sx={{
                            color: 'white',
                          }}
                        />
                      }
                      checkedIcon={
                        <FavoriteIcon
                          fontSize="large"
                          sx={{
                            color: 'secondary.main',
                          }}
                        />
                      }
                      checked={onlyFavoriteFilter}
                      onChange={handleOnlyFavoriteFilterChange}
                    />
                  </FavoriteBadge>
                </Tooltip>
              )}
              <Tooltip title="Cart">
                <Link to="/cart">
                  <Badge badgeContent={totalBooksInCart} color="secondary">
                    <ShoppingCartOutlinedIcon
                      fontSize="large"
                      sx={{
                        color: 'white',
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  </Badge>
                </Link>
              </Tooltip>
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
