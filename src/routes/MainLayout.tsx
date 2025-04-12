import { Outlet } from 'react-router-dom';
import { HeaderProps } from '../types/types.ts';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { Box } from '@mui/material';

export default function MainLayout({
  username,
  resetUsername,
  toggleTheme,
  isDarkTheme,
}: HeaderProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Header
        username={username}
        resetUsername={resetUsername}
        toggleTheme={toggleTheme}
        isDarkTheme={isDarkTheme}
      />
      <Outlet />
      <Footer />
    </Box>
  );
}
