import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'; // --- Import new icon ---
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- BloodBankGame import is no longer needed here ---

// --- Blood Compatibility Chart Component (No changes needed here) ---
const BloodCompatibilityChart = () => {
    const compatibilityData = [
        { type: 'A+', give: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'] },
        { type: 'O+', give: ['A+', 'B+', 'AB+', 'O+'], receive: ['O+', 'O-'] },
        { type: 'B+', give: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'] },
        { type: 'AB+', give: ['AB+'], receive: ['Everyone'] },
        { type: 'A-', give: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] },
        { type: 'O-', give: ['Everyone'], receive: ['O-'] },
        { type: 'B-', give: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] },
        { type: 'AB-', give: ['AB+', 'AB-'], receive: ['AB-', 'A-', 'B-', 'O-'] },
    ];

    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                 <WaterDropIcon color="primary" sx={{ mr: 1 }}/>
                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Blood Compatibility
                </Typography>
            </Box>
            <TableContainer>
                <Table size="small" aria-label="blood compatibility chart">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Can Donate To</TableCell>
                            <TableCell>Can Receive From</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {compatibilityData.map((row) => (
                            <TableRow key={row.type}>
                                <TableCell>
                                    <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                                        {row.type}
                                    </Typography>
                                </TableCell>
                                <TableCell>{row.give.join(', ')}</TableCell>
                                <TableCell>{row.receive.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

const Home = () => {
  const [stats, setStats] = useState({ totalDonors: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/stats');
            setStats(response.data);
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchStats();
  }, []);

  return (
    <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Home
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Welcome back! Here's a summary of your network.
        </Typography>

        <Grid container spacing={4}>
            {/* Top Row: Stats and Main Action */}
            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <PeopleAltIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ mt: 1, color: 'text.secondary' }}>Total Donors</Typography>
                    {loading ? <CircularProgress color="primary" size={32} /> : (
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            {stats.totalDonors}
                        </Typography>
                    )}
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Find a Match</Typography>
                    <Typography variant="body1" sx={{ my: 1, color: 'text.secondary' }}>
                        Use our advanced Predictor to find available donors based on location and blood group.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<SearchIcon />}
                        onClick={() => navigate('/predictor')}
                        sx={{ mt: 2 }}
                    >
                        Open Predictor
                    </Button>
                </Paper>
            </Grid>

            {/* --- NEW SECTION: Blood Bank Game Card --- */}
            <Grid item xs={12}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3 }}>
                    <SportsEsportsIcon color="primary" sx={{ fontSize: 48 }} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Blood Bank Challenge
                        </Typography>
                        <Typography variant="body1" sx={{ my: 0.5, color: 'text.secondary' }}>
                            Play our interactive game to see the impact of donations and help fill the blood bank!
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/blood-bank-game')}
                        sx={{ mt: { xs: 2, md: 0 }, width: { xs: '100%', md: 'auto' }, flexShrink: 0 }}
                    >
                        Play Now
                    </Button>
                </Paper>
            </Grid>

            {/* Middle Row: Compatibility Chart */}
            <Grid item xs={12}>
                <BloodCompatibilityChart />
            </Grid>

            {/* Bottom Row: Thalassemia Awareness */}
            <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CampaignIcon color="primary" sx={{ mr: 1.5, fontSize: 32 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Understanding Thalassemia
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Thalassemia is an inherited blood disorder that causes your body to have less hemoglobin than normal, which can lead to severe anemia. Patients with severe forms of thalassemia, such as beta-thalassemia major, require lifelong regular blood transfusions to survive and maintain their quality of life.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: '500' }}>
                        Your donation is not just a pint of blood; it's a lifeline. Consistent and safe blood supply is critical for these patients. By becoming a regular donor, you provide hope and a chance for a healthier life for someone in your community.
                    </Typography>
                    <Button 
                        variant="outlined" 
                        sx={{ mt: 3 }}
                        href="https://www.who.int/news-room/fact-sheets/detail/thalassaemia"
                        target="_blank"
                    >
                        Learn More from WHO
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    </Box>
  );
};

export default Home;
