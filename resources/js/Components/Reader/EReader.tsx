import React from 'react';
import { Box } from '@mui/material';

const EReader = ({ children }) => {
  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: (theme) => theme.palette.background.default,
      color: (theme) => theme.palette.text.primary,
    }}>
      {children}
    </Box>
  );
};

export default EReader;
