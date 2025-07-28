import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const SearchResults = ({ results }) => {
  return (
    <Grid container spacing={2}>
      {results.map((result, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{result.title}</Typography>
              <Typography variant="body2">{result.author}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResults;
