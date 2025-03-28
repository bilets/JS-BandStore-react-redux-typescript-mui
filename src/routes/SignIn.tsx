import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import { Stack, Button, TextField, Avatar } from '@mui/material';
import avatar from '../images/avatar.png';

interface SignInProps {
  addUsername: (username: string) => void;
}

export default function SignIn({ addUsername }: SignInProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handleSignIn = (): void => {
    navigate('books');
    addUsername(username);
  };

  return (
    <Stack
      component="form"
      sx={{
        width: '25ch',
        alignItems: 'center',
        margin: '0 auto',
        paddingTop: '20px',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <Avatar alt="User Avatar" src={avatar} sx={{ width: 225, height: 225 }} />
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={handleInputChange}
        helperText="Please enter your name (4-16 characters)"
        size="small"
        fullWidth
      />
      <Button
        variant="contained"
        disabled={username.length < 4 || username.length > 16}
        onClick={handleSignIn}
        fullWidth
      >
        Sign-In
      </Button>
    </Stack>
  );
}
