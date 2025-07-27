import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteAsync = (props) => {
  return <Autocomplete {...props} renderInput={(params) => <TextField {...params} />} />;
};

export default AutocompleteAsync;
