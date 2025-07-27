import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';

const CartDrawer = ({ open, onClose, cart }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {cart.items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Button component="a" href="/cart" variant="contained" sx={{ m: 2 }}>
        Go to Cart
      </Button>
    </Drawer>
  );
};

export default CartDrawer;
