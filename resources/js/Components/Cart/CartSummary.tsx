import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

const CartSummary = ({ subtotal, shipping, tax, total }: CartSummaryProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CartSummary;
