import React from 'react';
import { Container, Box } from '@mui/material';
import ResetPasswordForm from '../../Components/Auth/ResetPasswordForm';
import GuestLayout from '../../Layouts/GuestLayout';

const ResetPassword = () => {
    return (
        <GuestLayout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8 }}>
                    <ResetPasswordForm />
                </Box>
            </Container>
        </GuestLayout>
    );
};

export default ResetPassword;
