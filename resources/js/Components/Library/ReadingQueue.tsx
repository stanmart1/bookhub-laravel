import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const ReadingQueue = ({ books }) => {
  return (
    <div>
      <Typography variant="h6">Reading Queue</Typography>
      <List>
        {books.map((book, index) => (
          <ListItem key={index}>
            <ListItemText primary={book.title} secondary={book.author} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ReadingQueue.defaultProps = {
  books: [
    { title: 'Dune', author: 'Frank Herbert' },
    { title: 'Project Hail Mary', author: 'Andy Weir' },
  ],
};

export default ReadingQueue;
