import React from 'react';
import { Button } from '@mui/material';

const MobilePayment = ({ onPay }) => {
  return (
    <Button variant="contained" color="primary" onClick={onPay} fullWidth>
      Pay Now
    </Button>
  );
};

export default MobilePayment;
