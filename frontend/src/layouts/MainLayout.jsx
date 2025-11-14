import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ScienceIcon from '@mui/icons-material/Science';
import MapIcon from '@mui/icons-material/Map';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const drawerWidth = 260;

// These paths are correct
const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Donors', icon: <PeopleIcon />, path: '/donors' },
    { text: 'Add Donor', icon: <AddCircleIcon />, path: '/add-donor' },
    { text: 'Predictor', icon: <ScienceIcon />, path: '/predictor' },
];

// CORRECTED PATHS: Changed from PascalCase to kebab-case to match your router
const advancedNavItems = [
    { text: 'Blood Forecast Map', icon: <MapIcon />, path: '/forecast-map' },
    { text: 'Shelf Life Optimizer', icon: <InventoryIcon />, path: '/shelf-life' },
    { text: 'Location Tracker', icon: <LocationOnIcon />, path: '/location-tracker' },
]

const MainLayout = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar 
                position="fixed" 
                elevation={0} 
                sx={{ 
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                        BloodLinkAI
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: 'none' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', p: 2 }}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => navigate(item.path)} sx={{ borderRadius: '8px' }}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                     <Typography variant="overline" sx={{ pl: 2, color: 'text.secondary' }}>Advanced Tools</Typography>
                    <List>
                        {advancedNavItems.map((item) => (
                             <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => navigate(item.path)} sx={{ borderRadius: '8px' }}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;