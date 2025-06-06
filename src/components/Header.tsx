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
  Switch,
  Avatar,
} from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Header({
  username,
  resetUsername,
  toggleTheme,
  isDarkTheme,
}: HeaderProps) {
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
                          sx={{
                            color: 'white',
                          }}
                        />
                      }
                      checkedIcon={
                        <FavoriteIcon
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
              <Tooltip title="Toggle Theme">
                <Switch
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                  icon={<Brightness7Icon />}
                  checkedIcon={<Brightness4Icon sx={{ color: '#fff' }} />}
                />
              </Tooltip>
              <Button
                color="inherit"
                onClick={signOut}
                startIcon={<LogoutOutlinedIcon />}
                sx={{
                  textTransform: 'none',
                  '&:hover': {
                    color: 'secondary.main',
                  },
                }}
              >
                Sign Out
              </Button>
              {/* <Button
                variant="outlined"
                color="inherit"
                onClick={signOut}
                startIcon={<LogoutOutlinedIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                Sign Out
              </Button> */}
              <Avatar
                alt={username.toUpperCase()}
                src="/broken-image.jpg"
                sx={{ width: 30, height: 30 }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
