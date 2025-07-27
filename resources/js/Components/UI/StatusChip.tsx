import React from 'react';
import { Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  let color;
  switch (status) {
    case 'active':
      color = 'success';
      break;
    case 'inactive':
      color = 'default';
      break;
    case 'pending':
      color = 'warning';
      break;
    default:
      color = 'default';
  }

  return <Chip label={status} color={color} />;
};

export default StatusChip;
