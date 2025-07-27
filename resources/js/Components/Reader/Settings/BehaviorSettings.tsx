import React from 'react';
import { Box, Typography, FormControlLabel, Switch, ToggleButtonGroup, ToggleButton } from '@mui/material';

const BehaviorSettings = ({ settings, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Reading Behavior
      </Typography>
      <FormControlLabel
        control={<Switch checked={settings.auto_save_progress || false} onChange={(e) => onChange('auto_save_progress', e.target.checked)} />}
        label="Auto-save progress"
      />
      <FormControlLabel
        control={<Switch checked={settings.show_progress_bar || false} onChange={(e) => onChange('show_progress_bar', e.target.checked)} />}
        label="Show progress bar"
      />
      <FormControlLabel
        control={<Switch checked={settings.show_page_numbers || false} onChange={(e) => onChange('show_page_numbers', e.target.checked)} />}
        label="Show page numbers"
      />
      <Typography gutterBottom>Reading Mode</Typography>
      <ToggleButtonGroup
        value={settings.reading_mode || 'paginated'}
        exclusive
        onChange={(e, value) => onChange('reading_mode', value)}
        fullWidth
      >
        <ToggleButton value="paginated">Paginated</ToggleButton>
        <ToggleButton value="scrolled">Scrolled</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default BehaviorSettings;
