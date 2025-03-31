import { Outlet } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { Box } from '@mui/material';

interface MainLayoutProps {
  username: string;
  resetUsername: () => void;
}

export default function MainLayout({
  username,
  resetUsername,
}: MainLayoutProps) {
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
      <Header username={username} resetUsername={resetUsername} />
      <Outlet />
      <Footer />
    </Box>
  );
}
