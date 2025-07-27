import React from 'react';
import { Drawer, Box, Typography, TextField, Button } from '@mui/material';

const AdvancedFilters = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6">Advanced Filters</Typography>
        <TextField label="Author" variant="outlined" fullWidth margin="normal" />
        <TextField label="Genre" variant="outlined" fullWidth margin="normal" />
        <TextField
          label="Publication Year"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary">
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default AdvancedFilters;
