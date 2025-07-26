import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminStats from '../../Components/Admin/AdminStats';

const Dashboard = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Admin Dashboard
                </Typography>
                <AdminStats />
            </Container>
        </AdminLayout>
    );
};

export default Dashboard;
