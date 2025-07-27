import React from 'react';
import { Drawer, List, ListItem, ListItemText, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const BookFilters = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItem>
          <ListItemText primary="Filters" />
        </ListItem>
        <ListItem>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Fiction" />
            <FormControlLabel control={<Checkbox />} label="Non-Fiction" />
          </FormGroup>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default BookFilters;
