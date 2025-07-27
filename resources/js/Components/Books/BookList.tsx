import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Link } from '@inertiajs/react';

const BookList = ({ books }) => {
  return (
    <List>
      {books.map((book) => (
        <ListItem key={book.id} button component={Link} href={`/books/${book.id}`}>
          <ListItemAvatar>
            <Avatar src={book.cover_image} />
          </ListItemAvatar>
          <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
      ))}
    </List>
  );
};

export default BookList;
