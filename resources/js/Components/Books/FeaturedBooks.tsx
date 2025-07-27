import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Paper, Typography } from '@mui/material';

const FeaturedBooks = ({ books }) => {
  return (
    <Carousel>
      {books.map((book) => (
        <Paper key={book.id} elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">{book.title}</Typography>
          <Typography>{book.author}</Typography>
        </Paper>
      ))}
    </Carousel>
  );
};

export default FeaturedBooks;
