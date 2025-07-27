import React from 'react';
import { TextField } from '@mui/material';

const RichTextEditor = (props) => {
  return <TextField multiline rows={4} {...props} />;
};

export default RichTextEditor;
