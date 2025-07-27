import React from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';

const LoginForm = () => {
  return (
    <Card>
      <CardContent>
        <TextField label="Email" type="email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
