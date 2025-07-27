import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const processPayment = async ({ orderId, paymentDetails }) => {
  await axios.post(`/api/orders/${orderId}/pay`, paymentDetails);
};

const PaymentForm = ({ orderId }) => {
  const mutation = useMutation(processPayment);

  const handleSubmit = () => {
    mutation.mutate({ orderId, paymentDetails: {} });
  };

  return (
    <div>
      <TextField label="Card Number" fullWidth margin="normal" />
      <TextField label="Expiration Date" fullWidth margin="normal" />
      <TextField label="CVC" fullWidth margin="normal" />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Processing...' : 'Pay'}
      </Button>
    </div>
  );
};

export default PaymentForm;
