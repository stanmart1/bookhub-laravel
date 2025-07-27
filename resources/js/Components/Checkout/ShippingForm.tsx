import React from 'react';
import { TextField } from '@mui/material';

const ShippingForm = () => {
  return (
    <div>
      <TextField label="Full Name" fullWidth margin="normal" />
      <TextField label="Address" fullWidth margin="normal" />
      <TextField label="City" fullWidth margin="normal" />
      <TextField label="State" fullWidth margin="normal" />
      <TextField label="Zip Code" fullWidth margin="normal" />
    </div>
  );
};

export default ShippingForm;
