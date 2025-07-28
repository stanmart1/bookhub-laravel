import React from 'react';
import { List, ListItem, ListItemText, Switch } from '@mui/material';

const NotificationSettings = ({ settings, onToggle }) => {
  return (
    <List>
      {Object.keys(settings).map((key) => (
        <ListItem key={key}>
          <ListItemText primary={key} />
          <Switch
            checked={settings[key]}
            onChange={() => onToggle(key)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationSettings;
