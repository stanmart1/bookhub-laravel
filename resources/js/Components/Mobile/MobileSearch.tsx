import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const MobileSearch = () => {
  return (
    <Autocomplete
      freeSolo
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search..."
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default MobileSearch;
