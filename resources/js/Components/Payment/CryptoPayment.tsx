import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const CryptoPayment = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pay with Crypto</DialogTitle>
      <DialogContent>
        <Typography>
          Please send the exact amount to the following address:
        </Typography>
        <Typography>0x1234567890abcdef</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoPayment;
