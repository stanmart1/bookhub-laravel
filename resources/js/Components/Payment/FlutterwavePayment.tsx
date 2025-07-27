import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const FlutterwavePayment = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pay with Flutterwave</DialogTitle>
      <DialogContent>{/* Flutterwave payment form */}</DialogContent>
    </Dialog>
  );
};

export default FlutterwavePayment;
