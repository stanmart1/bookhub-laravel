import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

const QuantitySelector = ({ quantity, onUpdate }) => {
  return (
    <ButtonGroup>
      <Button onClick={() => onUpdate(quantity - 1)}>-</Button>
      <Button disabled>{quantity}</Button>
      <Button onClick={() => onUpdate(quantity + 1)}>+</Button>
    </ButtonGroup>
  );
};

export default QuantitySelector;
