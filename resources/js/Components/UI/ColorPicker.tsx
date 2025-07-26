import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const ColorPicker = (props: TextFieldProps) => {
    return <TextField {...props} type="color" />;
};

export default ColorPicker;
