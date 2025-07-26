import React from 'react';
import { Container, Box } from '@mui/material';
import ForgotPasswordForm from '../../Components/Auth/ForgotPasswordForm';
import GuestLayout from '../../Layouts/GuestLayout';

const ForgotPassword = () => {
    return (
        <GuestLayout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8 }}>
                    <ForgotPasswordForm />
                </Box>
            </Container>
        </GuestLayout>
    );
};

export default ForgotPassword;
