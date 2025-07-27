import React from 'react';
import { Container, Grid } from '@mui/material';
import AdminStats from '../../Components/Admin/AdminStats';

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AdminStats />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
