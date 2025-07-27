import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LibraryStats = ({ stats }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Library Stats</Typography>
        {stats.map((stat, index) => (
          <Typography key={index}>
            {stat.label}: {stat.value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

LibraryStats.defaultProps = {
  stats: [
    { label: 'Total Books', value: 150 },
    { label: 'Books Read', value: 75 },
    { label: 'Favorite Author', value: 'Jane Austen' },
  ],
};

export default LibraryStats;
