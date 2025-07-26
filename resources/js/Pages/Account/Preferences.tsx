import React from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import NotificationSettings from '../../Components/Account/NotificationSettings';

const Preferences = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Preferences
                </Typography>
                <NotificationSettings />
            </Container>
        </AppLayout>
    );
};

export default Preferences;
