import React from 'react';
import { Box, Typography, Slider, Select, MenuItem } from '@mui/material';

const FontSettings = ({ settings, onChange }) => {
  return (
    <Box>
      <Typography gutterBottom>Font Size</Typography>
      <Slider
        value={settings.font_size || 16}
        onChange={(e, value) => onChange('font_size', value)}
        valueLabelDisplay="auto"
        min={12}
        max={32}
        marks
      />
      <Typography gutterBottom>Font Family</Typography>
      <Select
        value={settings.font_family || 'Roboto'}
        onChange={(e) => onChange('font_family', e.target.value)}
        fullWidth
      >
        <MenuItem value="Roboto">Roboto</MenuItem>
        <MenuItem value="Georgia">Georgia</MenuItem>
        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
        <MenuItem value="Arial">Arial</MenuItem>
      </Select>
    </Box>
  );
};

export default FontSettings;
