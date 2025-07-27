import React from 'react';
import { TextField, Button } from '@mui/material';

const TwoFactorForm = () => {
  return (
    <div>
      <TextField label="One-time password" fullWidth margin="normal" />
      <Button variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </div>
  );
};

export default TwoFactorForm;
