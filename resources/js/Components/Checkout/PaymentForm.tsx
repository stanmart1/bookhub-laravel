import React from 'react';
import { TextField } from '@mui/material';

const PaymentForm = () => {
  return (
    <div>
      <TextField label="Card Number" fullWidth margin="normal" />
      <TextField label="Expiration Date" fullWidth margin="normal" />
      <TextField label="CVC" fullWidth margin="normal" />
    </div>
  );
};

export default PaymentForm;
