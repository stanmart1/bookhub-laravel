import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';

const ForgotPasswordForm = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <TextField label="Email" type="email" fullWidth margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordForm;
