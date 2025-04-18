import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#404040' },
    secondary: { main: '#f50057' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#404040' },
    secondary: { main: '#f50057' },
    background: {
      default: '#303030',
      paper: '#424242', 
    },
  },
});