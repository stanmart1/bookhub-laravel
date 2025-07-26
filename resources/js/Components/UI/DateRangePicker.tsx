import React from 'react';
import { LocalizationProvider, DateRangePicker, DateRange } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { Box, TextField } from '@mui/material';

interface DateRangePickerProps {
    value: DateRange<Date>;
    onChange: (date: DateRange<Date>) => void;
}

const ProDateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
                value={value}
                onChange={onChange}
                renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                )}
            />
        </LocalizationProvider>
    );
};

export default ProDateRangePicker;
