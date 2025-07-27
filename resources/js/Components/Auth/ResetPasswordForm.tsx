import React from 'react';
import { Paper, TextField, Button } from '@mui/material';

const ResetPasswordForm = () => {
  return (
    <Paper>
      <TextField label="Email" type="email" fullWidth margin="normal" />
      <TextField label="Password" type="password" fullWidth margin="normal" />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" fullWidth>
        Reset Password
      </Button>
    </Paper>
  );
};

export default ResetPasswordForm;
