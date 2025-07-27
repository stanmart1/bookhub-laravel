import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, Typography, LinearProgress, Button } from '@mui/material';

const fetchChallenges = async () => {
  const { data } = await axios.get('/api/reading-challenges');
  return data;
};

const joinChallenge = async (challengeId) => {
  await axios.post(`/api/reading-challenges/${challengeId}/join`);
};

const ReadingChallenges = () => {
  const queryClient = useQueryClient();
  const { data: challenges, isLoading, isError } = useQuery(['readingChallenges'], fetchChallenges);
  const mutation = useMutation(joinChallenge, {
    onSuccess: () => {
      queryClient.invalidateQueries(['readingChallenges']);
    },
  });

  const handleJoin = (challengeId) => {
    mutation.mutate(challengeId);
  };

  if (isLoading) return <div>Loading challenges...</div>;
  if (isError) return <div>Error loading challenges.</div>;

  return (
    <div>
      {challenges.map((challenge) => (
        <Card key={challenge.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{challenge.name}</Typography>
            <Typography>{challenge.description}</Typography>
            <LinearProgress variant="determinate" value={challenge.progress} />
            <Button onClick={() => handleJoin(challenge.id)} disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Joining...' : 'Join Challenge'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReadingChallenges;
