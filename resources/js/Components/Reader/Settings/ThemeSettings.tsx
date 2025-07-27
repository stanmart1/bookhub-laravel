import React from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';

const ThemeSettings = ({ settings, onChange }) => {
  return (
    <Box>
      <Typography gutterBottom>Theme</Typography>
      <ToggleButtonGroup
        value={settings.theme || 'light'}
        exclusive
        onChange={(e, value) => onChange('theme', value)}
        fullWidth
      >
        <ToggleButton value="light">Light</ToggleButton>
        <ToggleButton value="sepia">Sepia</ToggleButton>
        <ToggleButton value="dark">Dark</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ThemeSettings;
