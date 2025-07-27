import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const createCollection = async (name) => {
  const { data } = await axios.post('/api/library/collections', { name });
  return data.collection;
};

const CollectionManager = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries(['collections']);
      onClose();
    },
  });
  const [name, setName] = useState('');

  const handleSave = () => {
    mutation.mutate(name);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new collection</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Collection Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionManager;
