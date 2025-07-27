import React from 'react';
import { Container, Paper } from '@mui/material';

const AuthLayout = ({ children }) => {
  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>{children}</Paper>
    </Container>
  );
};

export default AuthLayout;
