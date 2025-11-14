import React, { useMemo } from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import SquareIcon from '@mui/icons-material/Square';
// Note: useQuery and donorService are no longer needed for this mock version
// import { useQuery } from '@tanstack/react-query';
// import donorService from '@/services/donorService';

const LOCATION_COORDINATES = {
    'Hyderabad': [17.3850, 78.4867],
    'Mumbai': [19.0760, 72.8777],
    'Delhi': [28.7041, 77.1025],
    'Bangalore': [12.9716, 77.5946],
    'Chennai': [13.0827, 80.2707],
    'Kolkata': [22.5726, 88.3639],
    'Pune': [18.5204, 73.8567],
    'Ahmedabad': [23.0225, 72.5714],
    'Jaipur': [26.9124, 75.7873],
    'Lucknow': [26.8467, 80.9462],
    'Nagpur': [21.1458, 79.0882],
};

// --- This is the mock data simulating a response from your backend ---
const mockLocationCounts = [
    { location: "Mumbai", count: 15 },    // Surplus
    { location: "Delhi", count: 8 },      // Adequate
    { location: "Bangalore", count: 3 },  // Shortage
    { location: "Chennai", count: 9 },    // Adequate
    { location: "Kolkata", count: 2 },    // Shortage
    { location: "Pune", count: 6 },       // Adequate
    { location: "Ahmedabad", count: 1 },  // Critical
    { location: "Jaipur", count: 11 },    // Surplus
    { location: "Lucknow", count: 0 },    // Critical
    { location: "Nagpur", count: 5 },     // Adequate
    { location: "Hyderabad", count: 18}   // Surplus
];

const getSupplyInfo = (count) => {
    if (count >= 10) return { level: 'Surplus', style: { color: '#4caf50', fillColor: '#4caf50' } };
    if (count >= 5) return { level: 'Adequate', style: { color: '#ffc107', fillColor: '#ffc107' } };
    if (count >= 2) return { level: 'Shortage', style: { color: '#ff9800', fillColor: '#ff9800' } };
    return { level: 'Critical', style: { color: '#d32f2f', fillColor: '#d32f2f' } };
};

const BloodForecastMap = () => {
    // The useQuery hook has been removed and replaced with our mock data
    const locationCounts = mockLocationCounts;

    const geoJsonData = useMemo(() => {
        if (!locationCounts) return null;

        const features = locationCounts
            .map(item => {
                const coordinates = LOCATION_COORDINATES[item.location];
                if (!coordinates) return null;

                const supplyInfo = getSupplyInfo(item.count);
                return {
                    type: 'Feature',
                    properties: { name: item.location, count: item.count, supply: supplyInfo.level },
                    geometry: { type: 'Point', coordinates: [coordinates[1], coordinates[0]] },
                };
            })
            .filter(Boolean);

        return { type: 'FeatureCollection', features: features };
    }, [locationCounts]);

    // isLoading and isError states are no longer needed
    // if (isLoading) return <CircularProgress />;
    // if (isError) return <Alert severity="error">Failed to load map data: {error.message}</Alert>;

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                Blood Supply Forecast Map
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Paper sx={{ height: '70vh', overflow: 'hidden' }}>
                        <MapContainer center={[22.0, 79.0]} zoom={5} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {geoJsonData && (
                                <GeoJSON
                                    data={geoJsonData}
                                    pointToLayer={(feature, latlng) => {
                                        const { style } = getSupplyInfo(feature.properties.count);
                                        return L.circleMarker(latlng, { radius: 8, ...style, weight: 2, fillOpacity: 0.8 });
                                    }}
                                    onEachFeature={(feature, layer) => {
                                        layer.bindPopup(`<b>${feature.properties.name}</b><br/>Available Donors: ${feature.properties.count}<br/>Supply: ${feature.properties.supply}`);
                                    }}
                                />
                            )}
                        </MapContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Legend</Typography>
                        <List dense>
                            <ListItem><ListItemIcon><SquareIcon sx={{ color: '#4caf50' }} /></ListItemIcon><ListItemText primary="Surplus (10+)" /></ListItem>
                            <ListItem><ListItemIcon><SquareIcon sx={{ color: '#ffc107' }} /></ListItemIcon><ListItemText primary="Adequate (5-9)" /></ListItem>
                            <ListItem><ListItemIcon><SquareIcon sx={{ color: '#ff9800' }} /></ListItemIcon><ListItemText primary="Shortage (2-4)" /></ListItem>
                            <ListItem><ListItemIcon><SquareIcon sx={{ color: '#d32f2f' }} /></ListItemIcon><ListItemText primary="Critical (0-1)" /></ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BloodForecastMap;
