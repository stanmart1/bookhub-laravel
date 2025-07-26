import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import AnalyticsCharts from '../../../Components/Admin/AnalyticsCharts';

const Overview = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Analytics Overview
                </Typography>
                <AnalyticsCharts />
            </Container>
        </AdminLayout>
    );
};

export default Overview;
