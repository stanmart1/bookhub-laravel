import React from 'react';
import { Container, Grid } from '@mui/material';
import AnalyticsCharts from '../../../Components/Admin/AnalyticsCharts';

const Overview = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AnalyticsCharts />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Overview;
