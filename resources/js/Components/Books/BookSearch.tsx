import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const BookSearch = () => {
  return (
    <Autocomplete
      freeSolo
      options={[]}
      renderInput={(params) => (
        <TextField {...params} label="Search books" margin="normal" />
      )}
    />
  );
};

export default BookSearch;
