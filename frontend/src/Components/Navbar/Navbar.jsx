import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Divider, IconButton, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const Logo = styled('img')({
    width: open ? '30%' : '60%',
    maxWidth: open ? '150px' : '40px',
    borderRadius: '8px',
    marginRight: open ? '10px' : '0',
    cursor: 'pointer',
    transition: 'all 0.3s',
  });

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/Dashboard' },
    { text: 'Team Members', icon: <AddIcon />, path: '/center' },
   
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedDrawerWidth,
          transition: 'width 0.3s',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Logo src="image.png" alt="DealsDray Logo" onClick={() => navigate('/dashboard')} />
        <Typography variant="h6" sx={{ flexGrow: 1, display: open ? 'block' : 'none' }}>
          DealsDray
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ display: open ? 'block' : 'none' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
