import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Box } from '@mui/material';

export default function NotFoundPage(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Alert severity="error" sx={{ maxWidth: 400 }}>
        <AlertTitle>Error 404</AlertTitle>
        Oops, something went wrong. The page you're looking for doesn't exist.
      </Alert>
    </Box>
  );
}
