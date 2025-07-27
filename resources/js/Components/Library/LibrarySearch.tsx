import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const LibrarySearch = ({ books }) => {
  return (
    <Autocomplete
      freeSolo
      options={books.map((option) => option.title)}
      renderInput={(params) => <TextField {...params} label="Search your library" />}
    />
  );
};

LibrarySearch.defaultProps = {
  books: [
    { title: 'The Great Gatsby' },
    { title: 'To Kill a Mockingbird' },
    { title: '1984' },
  ],
};

export default LibrarySearch;
