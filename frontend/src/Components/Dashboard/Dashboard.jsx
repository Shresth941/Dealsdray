import React from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../Navbar/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5f5',
      dark: '#eeeeee',
    },
  },
});

const boxesData = [
  { id: 4, label: 'Team Member', route: '/center' },


];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            padding: 2,
            overflowY: 'auto', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {boxesData.map((box) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={box.id}>
                <Box
                  onClick={() => navigate(box.route)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') navigate(box.route);
                  }}
                  sx={{
                    width: '100%', 
                    height: '150px',
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    cursor: 'pointer',
                    boxShadow: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'background-color 0.3s, transform 0.3s',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'scale(1.05)',
                    },
                    '&:focus': {
                      outline: '2px solid #1976d2',
                    },
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h8" component="span">
                    {box.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
