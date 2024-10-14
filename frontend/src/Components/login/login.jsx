import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Backend URL
const url = 'http://localhost:4000/api/login';

// Styled components
const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f1f1f1',
  padding: theme.spacing(2),
}));

const LoginBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '900px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    maxWidth: '500px',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f1f1f1',
}));

const Logo = styled('img')({
  width: '80%',
  maxWidth: '150px',
  borderRadius: '8px',
});

const FormContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LogoContainer>
          <Logo src="image.png" alt="DealsDray Logo" />
        </LogoContainer>
        <FormContainer>
          <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Login
          </Typography>
          {error && (
            <Typography variant="body2" sx={{ color: 'error.main', marginBottom: '10px' }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ padding: '12px', fontSize: '16px' }}
                >
                  LOG IN
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link href="/forgot-password" sx={{ display: 'block', marginTop: '15px', fontSize: '14px', textAlign: 'center' }}>
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
