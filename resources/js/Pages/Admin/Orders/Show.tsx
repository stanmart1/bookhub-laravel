import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';

const Show = ({ order }) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Order #{order.id}</Typography>
          <Typography variant="h6">Customer: {order.customer}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Show;
