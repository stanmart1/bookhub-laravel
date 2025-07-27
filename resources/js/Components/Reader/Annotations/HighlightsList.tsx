import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const fetchHighlights = async (bookId) => {
  const { data } = await axios.get(`/api/reader/books/${bookId}/highlights`);
  return data.highlights;
};

const HighlightsList = ({ bookId }) => {
  const { data: highlights, isLoading, isError } = useQuery(['highlights', bookId], () => fetchHighlights(bookId));

  if (isLoading) return <div>Loading highlights...</div>;
  if (isError) return <div>Error loading highlights.</div>;

  return (
    <div>
      <Typography variant="h6">Highlights</Typography>
      <List>
        {highlights.map((highlight) => (
          <ListItem key={highlight.id}>
            <ListItemText
              primary={highlight.selected_text}
              secondary={`Page ${highlight.page_number}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default HighlightsList;
