import React from 'react';
import { Chip } from '@mui/material';

const PaymentStatus = ({ status }) => {
  let color;
  switch (status) {
    case 'paid':
      color = 'success';
      break;
    case 'pending':
      color = 'warning';
      break;
    case 'failed':
      color = 'error';
      break;
    default:
      color = 'default';
  }

  return <Chip label={status} color={color} />;
};

export default PaymentStatus;
