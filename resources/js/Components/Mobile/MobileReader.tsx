import React from 'react';
import { Box } from '@mui/material';

const MobileReader = ({ children }) => {
  return <Box sx={{ overflow: 'auto', touchAction: 'pan-y' }}>{children}</Box>;
};

export default MobileReader;
