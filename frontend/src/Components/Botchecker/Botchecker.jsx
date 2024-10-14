import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
  Box,
  Typography,
  InputBase,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Navbar/Navbar';

const data = [
  // Sample data for demonstration purposes
];

export default function BotChecker() {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item sx={{ width: '240px' }}>
        <Sidebar /> 
      </Grid>
      <Grid item xs>
        <Box sx={{ padding: { xs: 2, md: 3 }, marginTop: '20px' }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            New Registration
          </Typography>

         
          <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginBottom: 2 }}>
            <InputBase
              sx={{
                backgroundColor: '#eeeeee',
                borderRadius: '5px',
                padding: '6px 12px',
                width: { xs: '60%', md: '25%' },
                textAlign: 'center',
                marginRight: '10px',
              }}
              placeholder="Search"
            />
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>

          {/* Table */}
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#eeeeee' }}>
                  <TableCell>Record Number</TableCell>
                  <TableCell>Business Details</TableCell>
                  <TableCell>Registration Timeline</TableCell>
                  <TableCell>Business Category</TableCell>
                  <TableCell>Document Status</TableCell>
                  <TableCell>Registered By</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{row.recordNumber}</TableCell>
                    <TableCell>
                      <img src="https://via.placeholder.com/50" alt="Business" />
                    </TableCell>
                    <TableCell>{row.businessDetails}</TableCell>
                    <TableCell>{row.registrationTimeline}</TableCell>
                    <TableCell>{row.businessCategory}</TableCell>
                    <TableCell>{row.documentStatus}</TableCell>
                    <TableCell>{row.registeredBy}</TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="success">
                        <CheckCircleIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
