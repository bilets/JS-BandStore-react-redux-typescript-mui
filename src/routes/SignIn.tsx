import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Stack, Button, TextField, Avatar } from '@mui/material';
import Einstein_without_a_tongue from '/images/Einstein_without_a_tongue.png';
import Einstein_with_a_tongue from '/images/Einstein_with_a_tongue.png';

type SignInProps = {
  addUsername: (username: string) => void;
};

export default function SignIn({ addUsername }: SignInProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value.trim());
  };

  const handleSignIn = (): void => {
    if (username.length >= 4 && username.length <= 16) {
      addUsername(username);
      navigate('books');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && username.length >= 4 && username.length <= 16) {
      e.preventDefault();
      handleSignIn();
    }
  };

  const isSignInDisabled = username.length < 4 || username.length > 16;

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
      <Avatar
        alt="User Avatar"
        src={
          isSignInDisabled ? Einstein_without_a_tongue : Einstein_with_a_tongue
        }
        sx={{ width: 225, height: 225 }}
      />
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        helperText={
          isSignInDisabled && 'Username must be between 4 and 16 characters'
        }
        error={isSignInDisabled}
        size="small"
        fullWidth
      />
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          '&:hover': {
            color: 'secondary.main',
          },
        }}
        disabled={isSignInDisabled}
        onClick={handleSignIn}
        fullWidth
      >
        Sign In
      </Button>
    </Stack>
  );
}
