import React from 'react';
import { List, ListItem, ListItemText, Switch } from '@mui/material';

const NotificationSettings = () => {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Email Notifications" />
        <Switch />
      </ListItem>
      <ListItem>
        <ListItemText primary="Push Notifications" />
        <Switch />
      </ListItem>
    </List>
  );
};

export default NotificationSettings;
