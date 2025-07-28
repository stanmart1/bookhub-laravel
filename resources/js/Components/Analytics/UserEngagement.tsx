import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserEngagement = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">User Engagement</Typography>
        <Typography variant="body2">Daily Active Users: {data.dau}</Typography>
        <Typography variant="body2">Monthly Active Users: {data.mau}</Typography>
        <Typography variant="body2">Session Duration: {data.sessionDuration} min</Typography>
      </CardContent>
    </Card>
  );
};

export default UserEngagement;
