import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const LibraryList = ({ books }) => {
  return (
    <List>
      {books.map((book, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar src={book.img} />
          </ListItemAvatar>
          <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
      ))}
    </List>
  );
};

LibraryList.defaultProps = {
  books: [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Book 1',
      author: 'Author 1',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Book 2',
      author: 'Author 2',
    },
  ],
};

export default LibraryList;
