import React, { useState } from 'react';
import {
  TextField, Button, Stack, Typography,
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, TableContainer, CircularProgress, TableSortLabel
} from '@mui/material';
import matchingService from '../services/matchingService';

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

const descendingComparator = (a, b, orderBy) => {
  let aValue, bValue;

  if (orderBy === 'availabilityScore') {
    aValue = a.availabilityScore ?? 0;
    bValue = b.availabilityScore ?? 0;
  } else if (orderBy === 'lastDonationDate') {
    aValue = a.donor?.lastDonationDate ? new Date(a.donor.lastDonationDate) : new Date(0);
    bValue = b.donor?.lastDonationDate ? new Date(b.donor.lastDonationDate) : new Date(0);
  } else {
    aValue = a.donor?.[orderBy] ?? '';
    bValue = b.donor?.[orderBy] ?? '';
  }

  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// --- THIS IS THE CORRECTED FUNCTION ---
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  
  stabilizedThis.sort((a, b) => {
    // Bug fix 1: Compare a[0] with b[0]
    const order = comparator(a[0], b[0]); 
    if (order !== 0) return order;
    
    // Bug fix 2: Use the correct index (1) for stability
    return a[1] - b[1]; 
  });
  
  // Bug fix 3: Map the array back to its original objects
  return stabilizedThis.map((el) => el[0]); 
};
// ------------------------------------

const BloodPredictor = () => {
  const [inputs, setInputs] = useState({ bloodGroup: 'O+', location: '' });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = async () => {
    if (!inputs.bloodGroup) {
      setError('Please select a blood group.');
      return;
    }
    setLoading(true);
    setError('');
    setMatches([]);
    try {
      const response = await matchingService.findBestDonors(inputs);
      console.log('API response:', response.data);
      setMatches(response.data);
    } catch {
      setError('Failed to find donors');
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const sortedMatches = stableSort(matches, getComparator(order, orderBy));

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Donor Predictor
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          select
          label="Blood Group"
          name="bloodGroup"
          value={inputs.bloodGroup}
          onChange={handleChange}
          required
          SelectProps={{ native: true }}
          sx={{ minWidth: 120 }}
        >
          <option value="">Select</option>
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </TextField>
        <TextField 
          label="Location" 
          name="location" 
          value={inputs.location} 
          onChange={handleChange} 
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          Find Donors
        </Button>
      </Stack>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table aria-label="donor matches table">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                  <TableSortLabel active={orderBy === 'name'} direction={orderBy === 'name' ? order : 'asc'} onClick={() => handleRequestSort('name')}>
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'bloodGroup' ? order : false}>
                  <TableSortLabel active={orderBy === 'bloodGroup'} direction={orderBy === 'bloodGroup' ? order : 'asc'} onClick={() => handleRequestSort('bloodGroup')}>
                    Blood Group
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'location' ? order : false}>
                  <TableSortLabel active={orderBy === 'location'} direction={orderBy === 'location' ? order : 'asc'} onClick={() => handleRequestSort('location')}>
                    Location
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'lastDonationDate' ? order : false}>
                  <TableSortLabel active={orderBy === 'lastDonationDate'} direction={orderBy === 'lastDonationDate' ? order : 'asc'} onClick={() => handleRequestSort('lastDonationDate')}>
                    Last Donation
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'availabilityScore' ? order : false}>
                  <TableSortLabel active={orderBy === 'availabilityScore'} direction={orderBy === 'availabilityScore' ? order : 'asc'} onClick={() => handleRequestSort('availabilityScore')}>
                    Predictability
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMatches.length > 0 ? (
                sortedMatches.map((match, idx) => (
                  <TableRow hover key={match?.donor?.id ?? idx}>
                    <TableCell>{match?.donor?.name ?? 'N/A'}</TableCell>
                    <TableCell>{match?.donor?.bloodGroup ?? 'N/A'}</TableCell>
                    <TableCell>{match?.donor?.location ?? 'N/A'}</TableCell>
                    <TableCell>
                      {match?.donor?.lastDonationDate ? new Date(match.donor.lastDonationDate).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      {match?.availabilityScore !== undefined ? `${(match.availabilityScore * 100).toFixed(2)}%` : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No matching donors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default BloodPredictor;