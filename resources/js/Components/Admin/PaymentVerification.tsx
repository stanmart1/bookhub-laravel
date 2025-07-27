import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PaymentVerification = ({ payment }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Payment Verification</Typography>
        <Typography>Amount: ${payment.amount}</Typography>
        <Button>Approve</Button>
        <Button>Reject</Button>
      </CardContent>
    </Card>
  );
};

export default PaymentVerification;
