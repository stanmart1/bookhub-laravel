import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const FriendsReading = ({ friends }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">What your friends are reading</Typography>
        {friends.map((friend, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar sx={{ mr: 2 }}>{friend.name.charAt(0)}</Avatar>
            <Typography>{`${friend.name} is reading "${friend.book}"`}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

FriendsReading.defaultProps = {
  friends: [
    { name: 'Grace', book: 'Pride and Prejudice' },
    { name: 'Heidi', book: 'The Hitchhiker\'s Guide to the Galaxy' },
  ],
};

export default FriendsReading;
