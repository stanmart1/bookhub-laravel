import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              {/* Recent activity content */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Reading Progress</Typography>
              {/* Reading progress content */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
