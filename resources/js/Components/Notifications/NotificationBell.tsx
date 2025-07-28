import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material';

const NotificationBell = ({ count, onClick }) => {
  return (
    <IconButton color="inherit" onClick={onClick}>
      <Badge badgeContent={count} color="error">
        <Notifications />
      </Badge>
    </IconButton>
  );
};

export default NotificationBell;
