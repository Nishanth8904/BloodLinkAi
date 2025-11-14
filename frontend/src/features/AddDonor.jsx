import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Define the validation rules for your form
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    bloodGroup: yup.string().required('Blood group is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required(),
    location: yup.string().required('Location is required'),
});

const AddDonor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        // This is where you call your API to submit the form data
        console.log('Form data:', data);
        alert('Donor added successfully!');
    };

    return (
        <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Add New Donor</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField 
                    label="Full Name" 
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField 
                    label="Blood Group (e.g., O+)" 
                    {...register('bloodGroup')}
                    error={!!errors.bloodGroup}
                    helperText={errors.bloodGroup?.message}
                />
                <TextField 
                    label="Phone Number" 
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
                <TextField 
                    label="Location (City)" 
                    {...register('location')}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                />
                <Button type="submit" variant="contained" size="large">
                    Submit
                </Button>
            </Box>
        </Paper>
    );
};

export default AddDonor;