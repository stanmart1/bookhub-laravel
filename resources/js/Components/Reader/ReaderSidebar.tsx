import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';

const ReaderSidebar = ({ open, onClose, items }) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {items.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ReaderSidebar;
