import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RealTimeMetrics = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Real-Time Metrics</Typography>
        <Typography variant="body2">Active Users: {data.activeUsers}</Typography>
        <Typography variant="body2">Sales: {data.sales}</Typography>
      </CardContent>
    </Card>
  );
};

export default RealTimeMetrics;
