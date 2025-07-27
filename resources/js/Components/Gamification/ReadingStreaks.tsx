import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ReadingStreaks = ({ streak }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Reading Streak</Typography>
        <Typography variant="h2">{streak}</Typography>
        <Typography variant="body2">days in a row</Typography>
      </CardContent>
    </Card>
  );
};

export default ReadingStreaks;
