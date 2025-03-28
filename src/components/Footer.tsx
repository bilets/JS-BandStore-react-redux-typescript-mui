import { Link, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '30px',
        backgroundColor: '#212121',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link
        href="https://prometheus.org.ua/"
        color="inherit"
        underline="none"
        sx={{
          color: '#ffffff',
          fontSize: '14px',
          '&:hover': {
            color: 'red',
          },
        }}
      >
        Prometheus © 2024
      </Link>
    </Box>
  );
}
