import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const FormatSelector = ({ value, onChange }) => {
  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange}>
      <ToggleButton value="ebook">Ebook</ToggleButton>
      <ToggleButton value="audiobook">Audiobook</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FormatSelector;
