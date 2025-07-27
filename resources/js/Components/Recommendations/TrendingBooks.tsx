import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

const TrendingBooks = ({ books }) => {
  return (
    <div>
      {books.map((book, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography>{book.author}</Typography>
            <Chip label="Trending" color="secondary" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

TrendingBooks.defaultProps = {
  books: [
    { title: 'Fourth Wing', author: 'Rebecca Yarros' },
    { title: 'Iron Flame', author: 'Rebecca Yarros' },
  ],
};

export default TrendingBooks;
