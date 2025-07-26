import React from 'react';
import { Container, Typography, Grid, List, Button } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import CartItem from '../../Components/Cart/CartItem';
import CartSummary from '../../Components/Cart/CartSummary';
import { Link } from '@inertiajs/inertia-react';

const cartItems = [
    { id: 1, title: 'Book 1', author: 'Author 1', cover_image: 'https://via.placeholder.com/150', price: 10.00, quantity: 1 },
    { id: 2, title: 'Book 2', author: 'Author 2', cover_image: 'https://via.placeholder.com/150', price: 15.00, quantity: 2 },
];

const Index = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.00;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Shopping Cart
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <List>
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
                        <Button component={Link} href="/checkout" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Proceed to Checkout
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </AppLayout>
    );
};

export default Index;
