import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

const ActivityFeed = ({ activities }) => {
  return (
    <List>
      {activities.map((activity, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>{activity.user.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${activity.user} ${activity.action}`}
            secondary={activity.date}
          />
        </ListItem>
      ))}
    </List>
  );
};

ActivityFeed.defaultProps = {
  activities: [
    { user: 'Eve', action: 'started reading "The Martian"', date: '2 hours ago' },
    { user: 'Frank', action: 'joined the "Mystery Lovers" book club', date: '5 hours ago' },
  ],
};

export default ActivityFeed;
