import React from 'react';
import { Box } from '@mui/material';

const ReaderContainer = ({ children }) => {
  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      {children}
    </Box>
  );
};

export default ReaderContainer;
