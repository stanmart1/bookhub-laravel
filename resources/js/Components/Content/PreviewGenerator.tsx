import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const PreviewGenerator = ({ open, onClose, onGenerate }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Generate Preview</DialogTitle>
      <DialogContent>
        <Button variant="contained" color="primary" onClick={onGenerate}>
          Generate
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewGenerator;
