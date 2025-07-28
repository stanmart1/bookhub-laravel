import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const UniversalSearch = () => {
  return (
    <Autocomplete
      freeSolo
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for books, authors, genres..."
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default UniversalSearch;
