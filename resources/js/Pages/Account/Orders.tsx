import React from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import OrderHistory from '../../Components/Account/OrderHistory';

const Orders = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    My Orders
                </Typography>
                <OrderHistory />
            </Container>
        </AppLayout>
    );
};

export default Orders;
