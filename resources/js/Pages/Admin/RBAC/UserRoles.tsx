import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';

const UserRoles = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    User Roles
                </Typography>
                {/* Transfer component will be added here */}
            </Container>
        </AdminLayout>
    );
};

export default UserRoles;
