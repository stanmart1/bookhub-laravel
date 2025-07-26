import React from 'react';
import { Autocomplete, TextField, Paper } from '@mui/material';

const BookSearch = () => {
    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Autocomplete
                freeSolo
                options={[]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search books, authors, genres..."
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </Paper>
    );
};

export default BookSearch;
