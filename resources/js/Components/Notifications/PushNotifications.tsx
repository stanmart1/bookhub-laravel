import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const PushNotifications = ({ open, onClose, onEnable }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enable Push Notifications</DialogTitle>
      <DialogContent>
        <Button variant="contained" color="primary" onClick={onEnable}>
          Enable
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PushNotifications;
