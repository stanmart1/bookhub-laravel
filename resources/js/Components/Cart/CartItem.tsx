import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const CartItem = ({ item, onRemove }) => {
  return (
    <ListItem>
      <ListItemText primary={item.name} secondary={`$${item.price}`} />
      <IconButton onClick={() => onRemove(item.id)}>
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default CartItem;
