import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const rewards = [
  { title: '10% off coupon', cost: 100 },
  { title: 'Free e-book', cost: 500 },
  { title: 'Early access to new releases', cost: 1000 },
];

const RewardCenter = () => {
  return (
    <Grid container spacing={2}>
      {rewards.map((reward, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{reward.title}</Typography>
              <Typography variant="body2">Cost: {reward.cost} points</Typography>
              <Button variant="contained" color="primary">
                Redeem
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RewardCenter;
