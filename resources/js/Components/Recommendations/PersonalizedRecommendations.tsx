import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Paper, Typography } from '@mui/material';

const fetchRecommendations = async () => {
  const { data } = await axios.get('/api/recommendations/personalized');
  return data.recommendations;
};

const PersonalizedRecommendations = () => {
  const { data: recommendations, isLoading, isError } = useQuery(['personalizedRecommendations'], fetchRecommendations);

  if (isLoading) return <div>Loading recommendations...</div>;
  if (isError) return <div>Error loading recommendations.</div>;

  return (
    <Carousel>
      {recommendations.map((rec) => (
        <Paper key={rec.id} elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">{rec.title}</Typography>
          <Typography>{rec.author}</Typography>
        </Paper>
      ))}
    </Carousel>
  );
};

export default PersonalizedRecommendations;
