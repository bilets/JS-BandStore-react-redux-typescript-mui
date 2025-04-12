import { Link, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '30px',
        backgroundColor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link
        href="https://prometheus.org.ua/"
        color="white"
        underline="none"
        sx={{
          fontSize: '14px',
          '&:hover': {
            color: 'secondary.main',
          },
        }}
      >
        Prometheus © 2024
      </Link>
    </Box>
  );
}
