import React from 'react';
import { Alert } from '@mui/material';

const OfflineReading = () => {
  return (
    <Alert severity="info">
      You are in offline mode. You can only access books that you have
      downloaded.
    </Alert>
  );
};

export default OfflineReading;
