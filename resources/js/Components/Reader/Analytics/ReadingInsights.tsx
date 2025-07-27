import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';

const fetchInsights = async () => {
  const { data } = await axios.get('/api/analytics/reading-insights');
  return data.insights;
};

const ReadingInsights = () => {
  const { data: insights, isLoading, isError } = useQuery(['readingInsights'], fetchInsights);

  if (isLoading) return <div>Loading insights...</div>;
  if (isError) return <div>Error loading insights.</div>;

  return (
    <div>
      {insights.map((insight, index) => (
        <Alert severity={insight.severity} key={index} sx={{ mb: 2 }}>
          <AlertTitle>{insight.title}</AlertTitle>
          {insight.text}
        </Alert>
      ))}
    </div>
  );
};

export default ReadingInsights;
