import React from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

const ReadingChallenges = ({ challenges }) => {
  return (
    <div>
      {challenges.map((challenge, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{challenge.name}</Typography>
            <Typography>{challenge.description}</Typography>
            <LinearProgress variant="determinate" value={challenge.progress} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

ReadingChallenges.defaultProps = {
  challenges: [
    {
      name: 'Read 5 books in a month',
      description: 'Challenge yourself to read 5 books in the current month.',
      progress: 60,
    },
    {
      name: 'Explore a new genre',
      description: 'Read a book from a genre you have never read before.',
      progress: 0,
    },
  ],
};

export default ReadingChallenges;
