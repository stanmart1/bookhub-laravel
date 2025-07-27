import React from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';

const AccessibilitySettings = ({ settings, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Accessibility
      </Typography>
      <FormControlLabel
        control={<Switch checked={settings.show_toc || false} onChange={(e) => onChange('show_toc', e.target.checked)} />}
        label="Show table of contents"
      />
    </Box>
  );
};

export default AccessibilitySettings;
