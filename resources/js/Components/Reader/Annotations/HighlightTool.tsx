import React from 'react';
import { Popover, Box, IconButton } from '@mui/material';
import { FormatColorFill } from '@mui/icons-material';

const HighlightTool = ({ anchorEl, onClose }) => {
  const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box sx={{ display: 'flex', p: 1 }}>
        {colors.map((color) => (
          <IconButton key={color} style={{ color }} onClick={() => console.log(color)}>
            <FormatColorFill />
          </IconButton>
        ))}
      </Box>
    </Popover>
  );
};

export default HighlightTool;
