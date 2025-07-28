import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const AnalyticsDashboard = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h5">${data.totalRevenue}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              New Users
            </Typography>
            <Typography variant="h5">{data.newUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Books Sold
            </Typography>
            <Typography variant="h5">{data.booksSold}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Conversion Rate
            </Typography>
            <Typography variant="h5">{data.conversionRate}%</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsDashboard;
