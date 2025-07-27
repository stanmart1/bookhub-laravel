import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';

const Show = ({ user }) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h6">{user.email}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Show;
