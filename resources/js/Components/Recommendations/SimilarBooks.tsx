import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const SimilarBooks = ({ books }) => {
  return (
    <Grid container spacing={2}>
      {books.map((book, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography>{book.author}</Typography>
              <Typography variant="body2" color="text.secondary">
                {`Similarity: ${book.similarity}%`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

SimilarBooks.defaultProps = {
  books: [
    { title: 'The Lies of Locke Lamora', author: 'Scott Lynch', similarity: 90 },
    { title: 'Six of Crows', author: 'Leigh Bardugo', similarity: 85 },
  ],
};

export default SimilarBooks;
