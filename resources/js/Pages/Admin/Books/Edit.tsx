import React from 'react';
import { Container, TextField, Button } from '@mui/material';

const Edit = ({ book }) => {
  return (
    <Container>
      <TextField label="Title" defaultValue={book.title} fullWidth margin="normal" />
      <TextField
        label="Author"
        defaultValue={book.author}
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
