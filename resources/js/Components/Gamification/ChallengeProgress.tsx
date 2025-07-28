import React from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

const ChallengeProgress = ({ challenge, progress }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{challenge.title}</Typography>
        <Typography variant="body2">{challenge.description}</Typography>
        <LinearProgress variant="determinate" value={progress} />
      </CardContent>
    </Card>
  );
};

export default ChallengeProgress;
