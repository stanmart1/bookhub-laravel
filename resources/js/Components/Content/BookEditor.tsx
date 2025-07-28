import React from 'react';
import { TextField, Button } from '@mui/material';

const BookEditor = ({ book, onSave }) => {
  const [title, setTitle] = React.useState(book?.title || '');
  const [author, setAuthor] = React.useState(book?.author || '');
  const [description, setDescription] = React.useState(book?.description || '');

  const handleSave = () => {
    onSave({ title, author, description });
  };

  return (
    <div>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        margin="normal"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default BookEditor;
