import React from 'react';
import { TextField, Button } from '@mui/material';

const ProfileForm = () => {
  return (
    <div>
      <TextField label="Name" fullWidth margin="normal" />
      <TextField label="Email" type="email" fullWidth margin="normal" />
      <Button variant="contained" color="primary">
        Save
      </Button>
    </div>
  );
};

export default ProfileForm;
