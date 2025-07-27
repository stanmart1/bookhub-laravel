import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const NotificationCard = ({ notification }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{notification.title}</Typography>
        <Typography variant="body2">{notification.message}</Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
