import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, LinearProgress, Typography } from '@mui/material';

const fetchProgress = async (bookId) => {
  const { data } = await axios.get(`/api/reader/books/${bookId}/progress`);
  return data.progress;
};

const ReadingProgress = ({ bookId }) => {
  const { data: progress, isLoading, isError } = useQuery(['progress', bookId], () => fetchProgress(bookId));

  if (isLoading) return <div>Loading progress...</div>;
  if (isError) return <div>Error loading progress.</div>;

  const value = progress ? progress.progress_percentage : 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ReadingProgress;
