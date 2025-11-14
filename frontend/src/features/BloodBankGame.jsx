import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import './BloodBankGame.css';

const API_URL = 'http://localhost:8080/api/game';

const BloodBankGame = () => {
    const GOAL_ML = 8000;
    const ML_PER_UNIT = 350;
    
    const [totalBloodMl, setTotalBloodMl] = useState(0);
    const [donors, setDonors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState(''); // State for the new email field
    const [bloodGroup, setBloodGroup] = useState('A+');
    const [bloodUnits, setBloodUnits] = useState(1);

    const fetchGameState = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/state`);
            setTotalBloodMl(response.data.totalBloodMl);
            setDonors(response.data.donors);
        } catch (error) {
            console.error("Failed to fetch game state:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGameState();
    }, [fetchGameState]);
    
    const isGoalReached = totalBloodMl >= GOAL_ML;

    const createConfetti = useCallback(() => {
        const confettiContainer = document.body;
        const confettiCount = 150;
        const colors = ['#E53E3E', '#38A169', '#3182CE', '#D69E2E', '#805AD5'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${-20 - Math.random() * 20}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }, []);

    useEffect(() => {
        if (isGoalReached) {
            createConfetti();
        }
    }, [isGoalReached, createConfetti]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const mlDonated = parseInt(bloodUnits) * ML_PER_UNIT;
        const newDonor = { name: donorName, email: donorEmail, bloodGroup, mlDonated };

        try {
            const response = await axios.post(`${API_URL}/donate`, newDonor);
            setTotalBloodMl(response.data.totalBloodMl);
            setDonors(response.data.donors);
        } catch (error) {
            console.error("Failed to add donation:", error);
        }
        
        setIsModalOpen(false);
        setDonorName('');
        setDonorEmail('');
        setBloodGroup('A+');
        setBloodUnits(1);
    };

    const resetGame = async () => {
        try {
            const response = await axios.post(`${API_URL}/reset`);
            setTotalBloodMl(response.data.totalBloodMl);
            setDonors(response.data.donors);
        } catch (error) {
            console.error("Failed to reset game:", error);
        }
    };

    const percentage = Math.min((totalBloodMl / GOAL_ML) * 100, 100);
    const totalLiters = (totalBloodMl / 1000).toFixed(2);

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            {isGoalReached && (
                <Dialog open={isGoalReached}>
                    <DialogTitle sx={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>GOAL REACHED!</DialogTitle>
                    <DialogContent sx={{ textAlign: 'center' }}>
                        <Typography>Thank you to all our amazing donors! An email has been sent to all participants.</Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
                        <Button onClick={resetGame} variant="contained">Start New Collection</Button>
                    </DialogActions>
                </Dialog>
            )}

            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'rgba(96, 89, 89, 0.8)' }}>Blood Bank Challenge</Typography>
                <Typography variant="subtitle1" sx={{ color: 'rgba(96, 89, 89, 0.8)' }}>Help us reach our goal of 8 Liters! Every drop counts.</Typography>
            </Box>

            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="blood-pack-container">
                        <div className="blood-pack">
                            <div className="blood-level" style={{ height: `${percentage}%` }}></div>
                            <div className="blood-pack-labels">
                                <span>0L</span><span>2L</span><span>4L</span><span>6L</span>
                                <span>8L Goal</span>
                            </div>
                            <Box sx={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                color: 'white', fontSize: '2rem', fontWeight: 'bold',
                                textShadow: '1px 1px 3px rgba(0,0,0,0.5)', pointerEvents: 'none'
                            }}>
                                {totalLiters} L
                            </Box>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Button variant="contained" size="large" fullWidth onClick={() => setIsModalOpen(true)} disabled={isGoalReached}>
                            Be a Donor
                        </Button>
                        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Recent Donors</Typography>
                        <Paper variant="outlined" sx={{ height: 200, overflowY: 'auto' }}>
                            <List>
                                {donors.length === 0 ? (
                                    <ListItem>
                                        <ListItemText primary="No donations yet..." sx={{ textAlign: 'center', color: 'text.secondary' }} />
                                    </ListItem>
                                ) : (
                                    donors.map((donor, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText 
                                                primary={`${donor.name} (${donor.bloodGroup})`} 
                                                secondary={`${donor.mlDonated}ml donated`}
                                            />
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Donor Information</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
                        <TextField autoFocus margin="dense" id="name" label="Donor Name" type="text" fullWidth variant="outlined" value={donorName} onChange={(e) => setDonorName(e.target.value)} required />
                        
                        {/* --- THIS IS THE NEW EMAIL FIELD --- */}
                        <TextField margin="dense" id="email" label="Email Address" type="email" fullWidth variant="outlined" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} required />

                        <FormControl fullWidth margin="dense">
                            <InputLabel id="blood-group-label">Blood Group</InputLabel>
                            <Select labelId="blood-group-label" id="bloodGroup" value={bloodGroup} label="Blood Group" onChange={(e) => setBloodGroup(e.target.value)}>
                                <MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem>
                                <MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField margin="dense" id="units" label="Units to Donate (1 unit = 350ml)" type="number" fullWidth variant="outlined" value={bloodUnits} onChange={(e) => setBloodUnits(e.target.value)} inputProps={{ min: 1, max: 2 }} required />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleFormSubmit} variant="contained">Donate Now</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BloodBankGame;
