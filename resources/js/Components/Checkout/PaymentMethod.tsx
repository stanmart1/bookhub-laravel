import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

const PaymentMethod = () => {
  return (
    <RadioGroup>
      <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
      <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
    </RadioGroup>
  );
};

export default PaymentMethod;
