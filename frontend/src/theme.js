import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#c62828', // A deep, professional red
        },
        secondary: {
            main: '#1e88e5', // A calming blue for accents
        },
        background: {
            default: '#f4f6f8', // A very light gray for the page background
            paper: '#ffffff',   // White for cards and surfaces
        },
        text: {
            primary: '#263238',   // A dark gray for primary text
            secondary: '#546e7a', // A lighter gray for secondary text
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif', // A clean, professional font
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px', // Softer, more modern corners
                    boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px', // A subtle shadow
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: 'none', // A cleaner look for the sidebar
                }
            }
        }
    },
});