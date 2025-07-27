import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';

const Show = ({ book }) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="h6">{book.author}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Show;
