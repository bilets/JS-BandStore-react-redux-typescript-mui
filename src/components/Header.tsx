import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Tooltip,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  username: string | null;
  resetUsername: () => void;
  resetCart: () => void;
}

export default function Header({
  username,
  resetUsername,
  resetCart,
}: HeaderProps) {
  const navigate = useNavigate();

  const signOut = (): void => {
    navigate('/');
    resetUsername();
    resetCart();
  };

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
              <ShoppingCartOutlinedIcon
                fontSize="large"
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'red',
                  },
                }}
              />
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
