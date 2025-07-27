import React from 'react';
import { Button } from '@mui/material';

const TouchControls = ({ onNext, onPrev }) => {
  return (
    <div>
      <Button onClick={onPrev}>Previous</Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};

export default TouchControls;
