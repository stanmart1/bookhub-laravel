import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const OfflineActions = ({ actions }) => {
  return (
    <List>
      {actions.map((action, index) => (
        <ListItem key={index}>
          <ListItemText primary={action.type} secondary={action.payload} />
        </ListItem>
      ))}
    </List>
  );
};

export default OfflineActions;
