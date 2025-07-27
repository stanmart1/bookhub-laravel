import React from 'react';
import { Container, TextField, Button } from '@mui/material';

const Edit = ({ user }) => {
  return (
    <Container>
      <TextField label="Name" defaultValue={user.name} fullWidth margin="normal" />
      <TextField
        label="Email"
        type="email"
        defaultValue={user.email}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Save
      </Button>
    </Container>
  );
};

export default Edit;
