import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const fetchStats = async () => {
  const { data } = await axios.get('/api/admin/stats');
  return data;
};

const AdminStats = () => {
  const { data: stats, isLoading, isError } = useQuery(['adminStats'], fetchStats);

  if (isLoading) return <div>Loading stats...</div>;
  if (isError) return <div>Error loading stats.</div>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h5">{stats.totalUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Books
            </Typography>
            <Typography variant="h5">{stats.totalBooks}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h5">{stats.totalOrders}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h5">${stats.totalRevenue}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminStats;
