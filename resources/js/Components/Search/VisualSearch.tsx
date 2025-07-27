import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const VisualSearch = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Visual Search</DialogTitle>
      <DialogContent>
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VisualSearch;
