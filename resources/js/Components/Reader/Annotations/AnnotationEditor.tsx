import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const updateHighlight = async ({ bookId, highlightId, note }) => {
  const { data } = await axios.put(`/api/reader/books/${bookId}/highlights/${highlightId}`, { note });
  return data.highlight;
};

const AnnotationEditor = ({ open, onClose, bookId, highlight }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateHighlight, {
    onSuccess: () => {
      queryClient.invalidateQueries(['highlights', bookId]);
      onClose();
    },
  });
  const [note, setNote] = useState('');

  useEffect(() => {
    if (highlight) {
      setNote(highlight.note || '');
    }
  }, [highlight]);

  const handleSave = () => {
    mutation.mutate({
      bookId,
      highlightId: highlight.id,
      note,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Note</DialogTitle>
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

export default AnnotationEditor;
