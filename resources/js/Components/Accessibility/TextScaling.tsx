import React from 'react';
import { Typography } from '@mui/material';

const TextScaling = ({ scale, children }) => {
  return (
    <Typography style={{ fontSize: `${scale}rem` }}>{children}</Typography>
  );
};

export default TextScaling;
