import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import UserManagement from '../../../Components/Admin/UserManagement';
import { Link } from '@inertiajs/inertia-react';

const Index = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    User Management
                </Typography>
                <Button component={Link} href="/admin/users/create" variant="contained" sx={{ mb: 2 }}>
                    Create User
                </Button>
                <UserManagement />
            </Container>
        </AdminLayout>
    );
};

export default Index;
