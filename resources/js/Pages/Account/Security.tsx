import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import PasswordChangeForm from '../../Components/Account/PasswordChangeForm';
import TwoFactorSetup from '../../Components/Account/TwoFactorSetup';

const Security = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Security
                </Typography>
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Change Password
                        </Typography>
                        <PasswordChangeForm />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Two-Factor Authentication
                        </Typography>
                        <TwoFactorSetup />
                    </CardContent>
                </Card>
            </Container>
        </AppLayout>
    );
};

export default Security;
