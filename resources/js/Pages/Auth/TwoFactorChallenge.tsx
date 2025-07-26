import React from 'react';
import { Container, Box } from '@mui/material';
import TwoFactorForm from '../../Components/Auth/TwoFactorForm';
import GuestLayout from '../../Layouts/GuestLayout';

const TwoFactorChallenge = () => {
    return (
        <GuestLayout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8 }}>
                    <TwoFactorForm />
                </Box>
            </Container>
        </GuestLayout>
    );
};

export default TwoFactorChallenge;
