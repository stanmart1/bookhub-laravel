import React from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const NotificationCenter = ({ open, onClose, notifications }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6">Notifications</Typography>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NotificationCenter;
