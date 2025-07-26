import React from 'react';
import { Container, Box, Typography, Alert } from '@mui/material';
import GuestLayout from '../../Layouts/GuestLayout';

const VerifyEmail = () => {
    return (
        <GuestLayout>
            <Container maxWidth="sm">
                <Box sx={{ mt: 8 }}>
                    <Alert severity="info">
                        <Typography>
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                        </Typography>
                    </Alert>
                </Box>
            </Container>
        </GuestLayout>
    );
};

export default VerifyEmail;
