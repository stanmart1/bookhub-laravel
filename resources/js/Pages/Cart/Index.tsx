import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, List } from '@mui/material';
import CartItem from '../../Components/Cart/CartItem';
import CartSummary from '../../Components/Cart/CartSummary';

const fetchCart = async () => {
  const { data } = await axios.get('/api/cart');
  return data;
};

const Index = () => {
  const { data: cart, isLoading, isError } = useQuery(['cart'], fetchCart);

  if (isLoading) return <div>Loading cart...</div>;
  if (isError) return <div>Error loading cart.</div>;

  return (
    <Container>
      <List>
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} onRemove={() => {}} />
        ))}
      </List>
      <CartSummary cart={cart} />
    </Container>
  );
};

export default Index;
