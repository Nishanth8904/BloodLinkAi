import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme'; 
import MainLayout from './layouts/MainLayout';

// Import all your page components
import Home from './features/Home';
import DonorList from './features/donors';
import AddDonor from './features/AddDonor';
import BloodPredictor from './features/BloodPredictor';
import BloodForecastMap from './features/BloodForecastMap';
import ShelfLifeOptimizer from './features/ShelfLifeOptimizer';
import LocationTracker from './features/LocationTracker';
import Chatbot from "./components/Chatbot/Chatbot";
import BloodBankGamePage from './features/BloodBankGamePage';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* The <Router> component has been REMOVED from this file. */}
      {/* `main.jsx` is already handling the routing. */}
      
      <Chatbot />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/donors" element={<DonorList />} />
          <Route path="/add-donor" element={<AddDonor />} />
          <Route path="/predictor" element={<BloodPredictor />} />
          <Route path="/forecast-map" element={<BloodForecastMap />} />
          <Route path="/shelf-life" element={<ShelfLifeOptimizer />} />
          <Route path="/location-tracker" element={<LocationTracker />} />
          <Route path="/blood-bank-game" element={<BloodBankGamePage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;