import React from 'react';
import { TextField, Button } from '@mui/material';

const PasswordChangeForm = () => {
  return (
    <div>
      <TextField label="Current Password" type="password" fullWidth margin="normal" />
      <TextField label="New Password" type="password" fullWidth margin="normal" />
      <TextField
        label="Confirm New Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Change Password
      </Button>
    </div>
  );
};

export default PasswordChangeForm;
