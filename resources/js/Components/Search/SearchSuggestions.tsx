import React from 'react';
import { MenuList, MenuItem, Paper } from '@mui/material';

const SearchSuggestions = ({ suggestions }) => {
  return (
    <Paper>
      <MenuList>
        {suggestions.map((suggestion, index) => (
          <MenuItem key={index}>{suggestion}</MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default SearchSuggestions;
