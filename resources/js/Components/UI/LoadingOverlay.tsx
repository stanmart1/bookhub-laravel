import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingOverlay = ({ open }) => {
  return (
    <Backdrop open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
