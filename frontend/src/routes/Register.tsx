import * as React from 'react';
import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
const API_URL = import.meta.env.VITE_API_URL;

const theme = createTheme();

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [randomImages, setRandomImages] = useState<string[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
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

    try {
      await axios.post(`${API_URL}/auth/signup`, newUser);
      Swal.fire({
        icon: "success",
        title: "Registered!",
        text: "Your account has been created successfully. Please log in.",
        confirmButtonColor: "#10617a",
      }).then(() => navigate("/login"));
    } catch (error) {
      // console.error("Registration failed: ", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again with a different email or check your information.",
        confirmButtonColor: "#10617a",
      });
    }
  };

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        if (!unsplashKey) {
          // console.error("Unsplash API key is missing. Set VITE_UNSPLASH_ACCESS_KEY in .env");
          return;
        }

        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              client_id: unsplashKey,
            },
          }
        );

        const imageUrl = response.data.urls.regular;
        setRandomImages([imageUrl]);

        if (imageUrl) {
          setBackgroundImage(imageUrl);
        }
      } catch (error) {
        // console.error("Error fetching random images:", error);
      }
    };

    fetchRandomImages();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ flex: 1 }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                      sx={{ backgroundColor: '#e1e2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1 }}>
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
                sx={{ mt: 1, mb: 1, color: 'white', backgroundColor: '#10617a'}}
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
    <Typography variant="body2" >
      {label}
    </Typography>
    <input
      type={type || 'text'}
      value={value}
      onChange={onChange}
      style={{
        padding: '5px',
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