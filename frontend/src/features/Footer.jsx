import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.100', position: 'fixed', bottom: 0, width: '100%' }}>
    <Typography variant="caption">&copy; 2025 BloodLinkAI. All rights reserved.</Typography>
  </Box>
);

export default Footer;
