import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const menuItems = [
    { label: 'Find a Donor', action: () => navigate('/predictor') },
    { label: 'Shelf Life Optimizer', action: () => navigate('/shelf-life') },
    { label: 'Blood Forecast Map', action: () => navigate('/forecast-map') },
    { label: 'Location Tracker', action: () => navigate('/location-tracker') },
  ];

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          BloodLinkAI
        </Typography>
        <Button color="inherit" onClick={() => navigate('/donors')}>Donors</Button>
        <Button color="inherit" onClick={() => navigate('/add-donor')}>Add Donor</Button>
        <IconButton color="error" onClick={openMenu} aria-label="blood drop menu">
          <BloodtypeIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          {menuItems.map((item) => (
            <MenuItem key={item.label} onClick={() => { item.action(); closeMenu(); }}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
