import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Skeleton,
    Alert,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import donorService from '../services/donorService';

// A professional loading state component
const DonorListSkeleton = () => (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
                <Skeleton variant="text" width={250} height={48} />
                <Skeleton variant="text" width={350} height={24} />
            </Box>
            <Skeleton variant="rectangular" width={160} height={40} sx={{ borderRadius: '8px' }} />
        </Box>
        <Paper elevation={3}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {[...Array(5)].map((_, i) => <TableCell key={i}><Skeleton variant="text" /></TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                                {[...Array(5)].map((_, j) => <TableCell key={j}><Skeleton variant="text" /></TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Box>
);

const DonorList = () => {
    const navigate = useNavigate(); // --- 1. Initialize the navigate function ---
    const { data: donors, isLoading, isError, error } = useQuery({
        queryKey: ['donors'],
        queryFn: donorService.getAllDonors 
    });

    if (isLoading) {
        return <DonorListSkeleton />;
    }

    if (isError) {
        return <Alert severity="error">Failed to load donor data: {error.message}</Alert>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Donor Directory</Typography>
                    <Typography variant="body1" color="text.secondary">Manage, view, and edit donor information.</Typography>
                </Box>
                {/* --- 2. Add the onClick handler to the button --- */}
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/add-donor')}
                >
                    Add New Donor
                </Button>
            </Box>

            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Blood Group</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donors.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography sx={{ p: 4 }}>No donors found. Be the first to add one!</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                donors.map((donor) => (
                                    <TableRow key={donor.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                                                    {donor.name.charAt(0)}
                                                </Avatar>
                                                {donor.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ fontWeight: 'bold' }}>{donor.bloodGroup}</Typography>
                                        </TableCell>
                                        <TableCell>{donor.location}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={donor.available ? 'Available' : 'Unavailable'}
                                                color={donor.available ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" color="primary"><EditIcon /></IconButton>
                                            <IconButton size="small" sx={{ color: 'primary.main' }}><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default DonorList;
