import React from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import ProfileForm from '../../Components/Account/ProfileForm';

const Profile = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Profile
                </Typography>
                <ProfileForm />
            </Container>
        </AppLayout>
    );
};

export default Profile;
