import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const AuthorPortal = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Books
            </Typography>
            <Typography variant="h5">{data.totalBooks}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Sales
            </Typography>
            <Typography variant="h5">{data.totalSales}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h5">${data.totalRevenue}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthorPortal;
