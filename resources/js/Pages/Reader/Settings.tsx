import React from 'react';
import { Box, Typography } from '@mui/material';
import ReaderSettings from '../../Components/Reader/ReaderSettings';

const Settings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reader Settings
      </Typography>
      <ReaderSettings open={true} onClose={() => {}} />
    </Box>
  );
};

export default Settings;
