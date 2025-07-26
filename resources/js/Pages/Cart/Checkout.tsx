import React from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import CheckoutStepper from '../../Components/Checkout/CheckoutStepper';

const Checkout = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Checkout
                </Typography>
                <CheckoutStepper />
            </Container>
        </AppLayout>
    );
};

export default Checkout;
