import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const createHighlight = async ({ bookId, highlight }) => {
  const { data } = await axios.post(`/api/reader/books/${bookId}/highlights`, highlight);
  return data.highlight;
};

const NoteTool = ({ open, onClose, bookId, selectedText }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createHighlight, {
    onSuccess: () => {
      queryClient.invalidateQueries(['highlights', bookId]);
      onClose();
    },
  });
  const [note, setNote] = useState('');

  const handleSave = () => {
    mutation.mutate({
      bookId,
      highlight: {
        selected_text: selectedText,
        note,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="note"
          label="Note"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="standard"
          value={note}
          onChange={(e) => setNote(e.target.value)}
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

export default NoteTool;
