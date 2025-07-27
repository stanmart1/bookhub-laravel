import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const fetchClubs = async () => {
  const { data } = await axios.get('/api/social/book-clubs');
  return data.clubs;
};

const joinClub = async (clubId) => {
  await axios.post(`/api/social/book-clubs/${clubId}/join`);
};

const BookClubs = () => {
  const queryClient = useQueryClient();
  const { data: clubs, isLoading, isError } = useQuery(['bookClubs'], fetchClubs);
  const mutation = useMutation(joinClub, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookClubs']);
    },
  });

  const handleJoin = (clubId) => {
    mutation.mutate(clubId);
  };

  if (isLoading) return <div>Loading book clubs...</div>;
  if (isError) return <div>Error loading book clubs.</div>;

  return (
    <Grid container spacing={2}>
      {clubs.map((club) => (
        <Grid item xs={12} md={6} key={club.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{club.name}</Typography>
              <Typography>{`Members: ${club.members.length}`}</Typography>
              <Button onClick={() => handleJoin(club.id)} disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Joining...' : 'Join Club'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookClubs;
