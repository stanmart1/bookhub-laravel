import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, Typography, Rating, Avatar, Box, TextField, Button } from '@mui/material';

const fetchReviews = async (bookId) => {
  const { data } = await axios.get(`/api/books/${bookId}/reviews`);
  return data;
};

const createReview = async ({ bookId, review }) => {
  await axios.post(`/api/books/${bookId}/reviews`, review);
};

const BookReviews = ({ bookId }) => {
  const queryClient = useQueryClient();
  const { data: reviews, isLoading, isError } = useQuery(['reviews', bookId], () => fetchReviews(bookId));
  const mutation = useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', bookId]);
    },
  });
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    mutation.mutate({ bookId, review: { rating, review } });
  };

  if (isLoading) return <div>Loading reviews...</div>;
  if (isError) return <div>Error loading reviews.</div>;

  return (
    <div>
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>{review.user.name.charAt(0)}</Avatar>
              <Typography variant="h6">{review.user.name}</Typography>
            </Box>
            <Rating value={review.rating} readOnly />
            <Typography>{review.review}</Typography>
          </CardContent>
        </Card>
      ))}
      <div>
        <Typography variant="h6">Write a review</Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <TextField
          label="Review"
          multiline
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          fullWidth
        />
        <Button onClick={handleSubmit} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default BookReviews;
