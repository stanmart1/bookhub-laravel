import React from 'react';
import { Drawer, List, ListItem, ListItemText, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const LibraryFilters = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItem>
          <ListItemText primary="Filters" />
        </ListItem>
        <ListItem>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Read" />
            <FormControlLabel control={<Checkbox />} label="Unread" />
            <FormControlLabel control={<Checkbox />} label="In Progress" />
          </FormGroup>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LibraryFilters;
