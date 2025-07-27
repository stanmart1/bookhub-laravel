import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CartSummary = ({ cart }) => {
  const total = cart.items.reduce((acc, item) => acc + item.price, 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Cart Summary</Typography>
        <Typography>Total: ${total}</Typography>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
