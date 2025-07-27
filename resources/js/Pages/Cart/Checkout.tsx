import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Button } from '@mui/material';
import CheckoutStepper from '../../Components/Checkout/CheckoutStepper';

const processCheckout = async () => {
  const { data } = await axios.post('/api/checkout');
  return data.order;
};

const Checkout = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(processCheckout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      // Redirect to order confirmation page
    },
  });

  return (
    <Container>
      <CheckoutStepper />
      <Button
        variant="contained"
        onClick={() => mutation.mutate()}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Placing order...' : 'Place Order'}
      </Button>
    </Container>
  );
};

export default Checkout;
