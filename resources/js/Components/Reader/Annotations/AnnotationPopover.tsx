import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Popover, Box, Button } from '@mui/material';

const deleteHighlight = async ({ bookId, highlightId }) => {
  await axios.delete(`/api/reader/books/${bookId}/highlights/${highlightId}`);
};

const AnnotationPopover = ({ anchorEl, onClose, onEdit, bookId, highlight }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteHighlight, {
    onSuccess: () => {
      queryClient.invalidateQueries(['highlights', bookId]);
      onClose();
    },
  });

  const handleDelete = () => {
    mutation.mutate({ bookId, highlightId: highlight.id });
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
        <Button onClick={onEdit}>Edit Note</Button>
        <Button onClick={handleDelete} color="error" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </Box>
    </Popover>
  );
};

export default AnnotationPopover;
