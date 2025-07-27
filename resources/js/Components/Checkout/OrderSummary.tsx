import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const OrderSummary = ({ cart }) => {
  return (
    <List>
      {cart.items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={item.name} secondary={`$${item.price}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default OrderSummary;
