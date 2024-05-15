import * as React from 'react';
import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPasswordError("");
    if (password.length <= 6) {
      setPasswordError("Password must be over 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const newUser = {
      email,
      password,
      displayName: name,
    };

    axios.post("http://localhost:8000/auth/signup", newUser)
      .then(() => navigate("/login"))
      .catch(error => {
        console.error("Registration failed: ", error.response?.data);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 3 }}>
              <CalendarMonthIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
              <InputField
                label="Your Name"
                value={name}
                onChange={e => setName(e.target.value)} type={undefined} error={undefined} helperText={undefined}              />
              <InputField
                label="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)} type={undefined} error={undefined} helperText={undefined}              />
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={passwordError.length > 0}
                helperText={passwordError}
              />
              <InputField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)} error={undefined} helperText={undefined}              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: 'white', backgroundColor: '#10617a'}}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const InputField = ({ label, value, onChange, type, error, helperText }: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  error?: boolean;
  helperText?: string;
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" sx={{ mb: 1 }}>
      {label}
    </Typography>
    <input
      type={type || 'text'}
      value={value}
      onChange={onChange}
      style={{
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '100%',
      }}
    />
    {error && (
      <Typography variant="body2" sx={{ color: 'red' }}>
        {helperText}
      </Typography>
    )}
  </Box>
);