import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 300 }}>
                <Typography variant="h6" sx={{ p: 2 }}>
                    Shopping Cart
                </Typography>
                <Divider />
                <List>
                    {/* Cart items will be rendered here */}
                    <ListItem>
                        <ListItemText primary="Book Title" secondary="$10.00" />
                    </ListItem>
                </List>
                <Divider />
                <Button component={Link} href="/checkout" variant="contained" sx={{ m: 2 }}>
                    Checkout
                </Button>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
