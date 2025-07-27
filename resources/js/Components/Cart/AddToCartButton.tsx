import React from 'react';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addToCart = async (bookId) => {
  await axios.post('/api/cart/add', { book_id: bookId, quantity: 1 });
};

const AddToCartButton = ({ bookId }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  return (
    <Button
      variant="contained"
      onClick={() => mutation.mutate(bookId)}
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartButton;
