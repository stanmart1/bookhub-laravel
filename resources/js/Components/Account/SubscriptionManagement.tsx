import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const SubscriptionManagement = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Your Subscription</Typography>
        <Typography>Current Plan: Premium</Typography>
        <Button>Change Plan</Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionManagement;
