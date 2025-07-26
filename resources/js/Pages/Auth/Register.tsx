import React from 'react';
import { Container, Box } from '@mui/material';
import RegisterForm from '../../Components/Auth/RegisterForm';
import GuestLayout from '../../Layouts/GuestLayout';

const Register = () => {
    return (
        <GuestLayout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8 }}>
                    <RegisterForm />
                </Box>
            </Container>
        </GuestLayout>
    );
};

export default Register;
