import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const AdvancedSettings = ({ settings, onChange }) => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Advanced Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Advanced Settings (JSON)"
            multiline
            rows={4}
            value={JSON.stringify(settings.advanced_settings || {}, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange('advanced_settings', parsed);
              } catch (error) {
                // Handle JSON parsing error if needed
              }
            }}
            fullWidth
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AdvancedSettings;
