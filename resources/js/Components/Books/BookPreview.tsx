import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const BookPreview = ({ open, onClose, book }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{book?.title}</DialogTitle>
      <DialogContent>{/* Book preview content */}</DialogContent>
    </Dialog>
  );
};

export default BookPreview;
