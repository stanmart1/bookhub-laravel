import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';

type FormFieldProps = TextFieldProps & {
    name: string;
};

const FormField = ({ name, ...props }: FormFieldProps) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
        <TextField
            {...props}
            {...register(name)}
            error={!!error}
            helperText={error?.message as string}
        />
    );
};

export default FormField;
