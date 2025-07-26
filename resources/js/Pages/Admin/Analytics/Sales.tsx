import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import AnalyticsCharts from '../../../Components/Admin/AnalyticsCharts';

const Sales = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Sales Analytics
                </Typography>
                <AnalyticsCharts />
            </Container>
        </AdminLayout>
    );
};

export default Sales;
