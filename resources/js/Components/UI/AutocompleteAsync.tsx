import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface AutocompleteAsyncProps<T> {
    fetchOptions: (query: string) => Promise<T[]>;
    getOptionLabel: (option: T) => string;
    label: string;
}

const AutocompleteAsync = <T,>({ fetchOptions, getOptionLabel, label }: AutocompleteAsyncProps<T>) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly T[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleInputChange = async (event: React.SyntheticEvent, value: string) => {
        setLoading(true);
        const newOptions = await fetchOptions(value);
        setOptions(newOptions);
        setLoading(false);
    };

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onInputChange={handleInputChange}
            options={options}
            getOptionLabel={getOptionLabel}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <div>...</div> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};

export default AutocompleteAsync;
