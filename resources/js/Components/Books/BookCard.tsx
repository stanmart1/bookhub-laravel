import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from '@inertiajs/react';

const BookCard = ({ book }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={book.cover_image}
        alt={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link href={`/books/${book.id}`}>{book.title}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
