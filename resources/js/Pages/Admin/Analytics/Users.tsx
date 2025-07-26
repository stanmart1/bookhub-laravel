import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import AnalyticsCharts from '../../../Components/Admin/AnalyticsCharts';

const Users = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    User Analytics
                </Typography>
                <AnalyticsCharts />
            </Container>
        </AdminLayout>
    );
};

export default Users;
