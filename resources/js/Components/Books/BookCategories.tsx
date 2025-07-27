import React from 'react';
import { Chip, Box } from '@mui/material';

const BookCategories = ({ categories }) => {
  return (
    <Box>
      {categories.map((category) => (
        <Chip key={category.id} label={category.name} sx={{ mr: 1 }} />
      ))}
    </Box>
  );
};

export default BookCategories;
