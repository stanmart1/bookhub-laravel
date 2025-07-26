import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const RichTextEditor = (props: TextFieldProps) => {
    return <TextField {...props} multiline rows={4} />;
};

export default RichTextEditor;
