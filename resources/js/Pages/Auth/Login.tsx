import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '../../Components/Auth/LoginForm';
import GuestLayout from '../../Layouts/GuestLayout';

const Login = () => {
    return (
        <GuestLayout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8 }}>
                    <LoginForm />
                </Box>
            </Container>
        </GuestLayout>
    );
};

export default Login;
