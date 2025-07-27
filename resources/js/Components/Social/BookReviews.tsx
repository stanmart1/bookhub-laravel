import React from 'react';
import { Card, CardContent, Typography, Rating, Avatar, Box } from '@mui/material';

const BookReviews = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>{review.user.charAt(0)}</Avatar>
              <Typography variant="h6">{review.user}</Typography>
            </Box>
            <Rating value={review.rating} readOnly />
            <Typography>{review.text}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

BookReviews.defaultProps = {
  reviews: [
    { user: 'Ivan', rating: 5, text: 'Absolutely loved it! A must-read.' },
    { user: 'Judy', rating: 4, text: 'A great read, but the ending was a bit slow.' },
  ],
};

export default BookReviews;
