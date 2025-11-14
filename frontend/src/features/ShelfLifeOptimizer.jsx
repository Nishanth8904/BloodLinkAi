import React from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, addDays, differenceInDays } from 'date-fns';

// Mock data for blood inventory (replace with your API data)
const MOCK_INVENTORY = [
  { id: 'UNIT-001', type: 'O+', donated: '2025-08-15' },
  { id: 'UNIT-002', type: 'A+', donated: '2025-08-22' },
  { id: 'UNIT-003', type: 'B-', donated: '2025-07-20' },
  { id: 'UNIT-004', type: 'O+', donated: '2025-08-05' },
  { id: 'UNIT-005', type: 'AB-', donated: '2025-08-18' },
  { id: 'UNIT-006', type: 'A+', donated: '2025-07-28' },
  { id: 'UNIT-007', type: 'O-', donated: '2025-08-23' },
];

const SHELF_LIFE_DAYS = 42; // Standard shelf life for red blood cells

const processInventoryData = (inventory) => {
    const today = new Date();
    return inventory.map(unit => {
        const donationDate = new Date(unit.donated);
        const expiryDate = addDays(donationDate, SHELF_LIFE_DAYS);
        const daysUntilExpiry = differenceInDays(expiryDate, today);

        let status;
        let color;
        if (daysUntilExpiry <= 0) {
            status = 'Expired';
            color = 'error';
        } else if (daysUntilExpiry <= 7) {
            status = 'Urgent';
            color = 'error';
        } else if (daysUntilExpiry <= 14) {
            status = 'At Risk';
            color = 'warning';
        } else {
            status = 'Safe';
            color = 'success';
        }

        return {
            ...unit,
            expiryDate: format(expiryDate, 'yyyy-MM-dd'),
            daysUntilExpiry,
            status,
            color
        };
    }).sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
};

const ShelfLifeOptimizer = () => {
    const processedInventory = processInventoryData(MOCK_INVENTORY);

    const chartData = [
        { name: 'Expiring in 7 Days', units: processedInventory.filter(u => u.daysUntilExpiry > 0 && u.daysUntilExpiry <= 7).length },
        { name: 'Expiring in 14 Days', units: processedInventory.filter(u => u.daysUntilExpiry > 7 && u.daysUntilExpiry <= 14).length },
        { name: 'Safe (> 14 Days)', units: processedInventory.filter(u => u.daysUntilExpiry > 14).length },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                Shelf Life Optimizer
            </Typography>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3, height: '400px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Inventory Expiry Outlook</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="units" fill="#c62828" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                {/* Key Stats */}
                <Grid item xs={12} lg={6}>
                     <Paper sx={{ p: 3, height: '400px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Inventory Summary</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '85%'}}>
                            <Typography variant="h4">Total Units: <b>{processedInventory.length}</b></Typography>
                            <Typography variant="h4">Expired Units: <b style={{color: '#c62828'}}>{processedInventory.filter(u => u.status === 'Expired').length}</b></Typography>
                            <Typography variant="h4">Urgent (≤ 7 days): <b style={{color: '#c62828'}}>{chartData[0].units}</b></Typography>
                            <Typography variant="h4">At Risk (≤ 14 days): <b style={{color: '#f57c00'}}>{chartData[1].units}</b></Typography>
                        </Box>
                     </Paper>
                </Grid>
                {/* Detailed Table */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', p: 2 }}>Detailed Inventory Status</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Unit ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Blood Type</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Donation Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Expiry Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Days Left</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {processedInventory.map((unit) => (
                                        <TableRow key={unit.id} hover>
                                            <TableCell>{unit.id}</TableCell>
                                            <TableCell><b>{unit.type}</b></TableCell>
                                            <TableCell>{unit.donated}</TableCell>
                                            <TableCell>{unit.expiryDate}</TableCell>
                                            <TableCell>{unit.daysUntilExpiry > 0 ? unit.daysUntilExpiry : '-'}</TableCell>
                                            <TableCell>
                                                <Chip label={unit.status} color={unit.color} size="small" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShelfLifeOptimizer;