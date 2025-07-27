import React from 'react';
import { Box, Typography, Slider, ToggleButtonGroup, ToggleButton } from '@mui/material';

const LayoutSettings = ({ settings, onChange }) => {
  return (
    <Box>
      <Typography gutterBottom>Line Height</Typography>
      <Slider
        value={settings.line_height || 1.5}
        onChange={(e, value) => onChange('line_height', value)}
        valueLabelDisplay="auto"
        min={1.2}
        max={2.0}
        step={0.1}
        marks
      />
      <Typography gutterBottom>Margins</Typography>
      <ToggleButtonGroup
        value={settings.margins || 'normal'}
        exclusive
        onChange={(e, value) => onChange('margins', value)}
        fullWidth
      >
        <ToggleButton value="narrow">Narrow</ToggleButton>
        <ToggleButton value="normal">Normal</ToggleButton>
        <ToggleButton value="wide">Wide</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LayoutSettings;
