import React from 'react';
import { Container, TextField, Button } from '@mui/material';

const Create = () => {
  return (
    <Container>
      <TextField label="Title" fullWidth margin="normal" />
      <TextField label="Author" fullWidth margin="normal" />
      <Button variant="contained" color="primary">
        Create
      </Button>
    </Container>
  );
};

export default Create;
