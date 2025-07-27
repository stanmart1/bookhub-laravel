import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check } from '@mui/icons-material';

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: 9.99,
    features: ['5 books per month', 'Basic support'],
    popular: false,
  },
  {
    id: 2,
    name: 'Pro',
    price: 19.99,
    features: ['Unlimited books', 'Priority support', 'Early access'],
    popular: true,
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 49.99,
    features: ['All Pro features', 'Dedicated account manager', 'Custom branding'],
    popular: false,
  },
];

const SubscriptionPlans = () => {
  return (
    <Grid container spacing={3}>
      {plans.map((plan) => (
        <Grid item xs={12} md={4} key={plan.id}>
          <Card raised={plan.popular}>
            {plan.popular && (
              <Chip
                label="Most Popular"
                color="secondary"
                sx={{ position: 'absolute', top: 16, right: 16 }}
              />
            )}
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {plan.name}
              </Typography>
              <Typography variant="h3" color="primary">
                ${plan.price}
                <Typography component="span" variant="h6" color="textSecondary">
                  /month
                </Typography>
              </Typography>
              <List>
                {plan.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Check color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button
                variant={plan.popular ? 'contained' : 'outlined'}
                fullWidth
                size="large"
              >
                Choose Plan
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscriptionPlans;
