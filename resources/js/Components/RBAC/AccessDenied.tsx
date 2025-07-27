import React from 'react';
import { Alert } from '@mui/material';

const AccessDenied = () => {
  return <Alert severity="error">You do not have permission to access this page.</Alert>;
};

export default AccessDenied;
