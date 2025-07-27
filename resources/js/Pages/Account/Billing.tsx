import React from 'react';
import { Container, Card, CardContent } from '@mui/material';
import SubscriptionManagement from '../../Components/Account/SubscriptionManagement';
import PaymentHistory from '../../Components/Payment/PaymentHistory';

const Billing = () => {
  return (
    <Container>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <SubscriptionManagement />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <PaymentHistory payments={[]} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Billing;
