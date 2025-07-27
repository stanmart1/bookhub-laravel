import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const AuthorRecommendations = ({ authors }) => {
  return (
    <List>
      {authors.map((author, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>{author.name.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={author.name}
            secondary={`You might like their book: "${author.book}"`}
          />
        </ListItem>
      ))}
    </List>
  );
};

AuthorRecommendations.defaultProps = {
  authors: [
    { name: 'Neil Gaiman', book: 'American Gods' },
    { name: 'Terry Pratchett', book: 'Guards! Guards!' },
  ],
};

export default AuthorRecommendations;
