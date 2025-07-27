import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const SavedSearches = ({ searches, onDelete }) => {
  return (
    <List>
      {searches.map((search, index) => (
        <ListItem key={index}>
          <ListItemText primary={search.query} />
          <IconButton onClick={() => onDelete(search.id)}>
            <Delete />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SavedSearches;
