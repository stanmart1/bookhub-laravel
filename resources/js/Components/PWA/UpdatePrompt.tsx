import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const UpdatePrompt = ({ open, onClose, onUpdate }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Available</DialogTitle>
      <DialogContent>
        A new version of the application is available.
        <Button variant="contained" color="primary" onClick={onUpdate}>
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePrompt;
