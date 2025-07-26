import React from 'react';
import { Alert, AlertTitle, Typography, Button } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';

const OrderConfirmation = () => {
    return (
        <Alert severity="success">
            <AlertTitle>Order Confirmed</AlertTitle>
            <Typography>
                Thank you for your order! Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped.
            </Typography>
            <Button component={Link} href="/account/orders" variant="contained" sx={{ mt: 2 }}>
                View Orders
            </Button>
        </Alert>
    );
};

export default OrderConfirmation;
