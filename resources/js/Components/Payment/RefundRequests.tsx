import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const RefundRequests = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Request a Refund</Typography>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Reason for refund"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary">
          Submit Request
        </Button>
      </CardContent>
    </Card>
  );
};

export default RefundRequests;
