import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';

const ReadingBuddies = ({ buddies }) => {
  return (
    <List>
      {buddies.map((buddy, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <Button edge="end" aria-label="message">
              Message
            </Button>
          }
        >
          <ListItemAvatar>
            <Avatar>{buddy.name.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={buddy.name}
            secondary={`Reading "${buddy.currentBook}"`}
          />
        </ListItem>
      ))}
    </List>
  );
};

ReadingBuddies.defaultProps = {
  buddies: [
    { name: 'Mallory', currentBook: 'Dune' },
    { name: 'Niaj', currentBook: 'Project Hail Mary' },
  ],
};

export default ReadingBuddies;
