import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const PaymentMethods = ({ methods, onEdit, onDelete }) => {
  return (
    <List>
      {methods.map((method) => (
        <ListItem
          key={method.id}
          secondaryAction={
            <>
              <IconButton onClick={() => onEdit(method.id)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(method.id)}>
                <Delete />
              </IconButton>
            </>
          }
        >
          <ListItemText
            primary={method.card_type}
            secondary={`**** **** **** ${method.last_four}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PaymentMethods;
