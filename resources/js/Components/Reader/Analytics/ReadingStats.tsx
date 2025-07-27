import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const fetchStats = async () => {
  const { data } = await axios.get('/api/analytics/reading-stats');
  return data.stats;
};

const ReadingStats = () => {
  const { data: stats, isLoading, isError } = useQuery(['readingStats'], fetchStats);

  if (isLoading) return <div>Loading stats...</div>;
  if (isError) return <div>Error loading stats.</div>;

  const formattedStats = [
    { label: 'Total Reading Time', value: `${Math.floor(stats.total_reading_time / 3600)}h ${Math.floor((stats.total_reading_time % 3600) / 60)}m` },
    { label: 'Total Sessions', value: stats.total_sessions },
    { label: 'Avg. Session Time', value: `${Math.floor(stats.avg_session_time / 60)}m` },
  ];

  return (
    <Grid container spacing={2}>
      {formattedStats.map((stat, index) => (
        <Grid item xs={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {stat.label}
              </Typography>
              <Typography variant="h5">{stat.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReadingStats;
