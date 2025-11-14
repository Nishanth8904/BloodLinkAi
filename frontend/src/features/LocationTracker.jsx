import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Select,
    MenuItem,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    FormControl,
    InputLabel
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Mock data for blood bank locations (replace with your API data)
const MOCK_LOCATIONS = [
    { id: 1, name: 'City Central Hospital', address: '123 Main St, Downtown', lat: 17.3850, lng: 78.4867, inventory: ['O+', 'A+', 'B-'] },
    { id: 2, name: 'Suburb Community Clinic', address: '456 Oak Ave, Suburbia', lat: 17.4478, lng: 78.3614, inventory: ['A+', 'AB+', 'O-'] },
    { id: 3, name: 'Northside General', address: '789 Pine Rd, Northside', lat: 17.4947, lng: 78.4000, inventory: ['B+', 'O+', 'A-'] },
    { id: 4, name: 'Eastern Medical Center', address: '101 Maple Dr, Eastville', lat: 17.3916, lng: 78.5522, inventory: ['AB-', 'O-'] },
];

// Fix for default Leaflet icon issue with bundlers like Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationTracker = () => {
  const [bloodType, setBloodType] = useState('O+');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Initially, show all locations
    setLocations(MOCK_LOCATIONS);
  }, []);

  const handleTrack = () => {
    // In a real app, this would be an API call. Here we filter mock data.
    const filtered = MOCK_LOCATIONS.filter(loc => loc.inventory.includes(bloodType));
    setLocations(filtered);
  };

  return (
    <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Blood Bank Locator
        </Typography>
        <Grid container spacing={3}>
            {/* Left Panel: Controls and Results */}
            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>Find Available Blood</Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Blood Type</InputLabel>
                        <Select
                            value={bloodType}
                            label="Blood Type"
                            onChange={e => setBloodType(e.target.value)}
                        >
                            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleTrack} fullWidth>
                        Search Locations
                    </Button>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="subtitle1" gutterBottom>
                        {locations.length} Location(s) Found
                    </Typography>
                    <List sx={{ maxHeight: '45vh', overflowY: 'auto' }}>
                        {locations.map(loc => (
                            <ListItem key={loc.id} divider>
                                <ListItemText 
                                    primary={loc.name} 
                                    secondary={`${loc.address} | Available: ${loc.inventory.join(', ')}`} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            {/* Right Panel: Map */}
            <Grid item xs={12} md={8}>
                <Paper sx={{ height: '70vh', overflow: 'hidden' }}>
                    <MapContainer center={[17.43, 78.48]} zoom={11} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {locations.map(loc => (
                            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                                <Popup>
                                    <b>{loc.name}</b><br />
                                    {loc.address}<br />
                                    Available: {loc.inventory.join(', ')}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Paper>
            </Grid>
        </Grid>
    </Box>
  );
};

export default LocationTracker;