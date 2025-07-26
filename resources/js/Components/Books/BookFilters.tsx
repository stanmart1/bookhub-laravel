import React from 'react';
import { Drawer, List, ListItem, ListItemText, Checkbox, FormControlLabel, FormGroup, Divider, Typography } from '@mui/material';

interface BookFiltersProps {
    open: boolean;
    onClose: () => void;
}

const BookFilters = ({ open, onClose }: BookFiltersProps) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div style={{ width: 250 }}>
                <Typography variant="h6" sx={{ p: 2 }}>
                    Filters
                </Typography>
                <Divider />
                <List>
                    <ListItem>
                        <FormGroup>
                            <Typography variant="subtitle1">Category</Typography>
                            <FormControlLabel control={<Checkbox />} label="Fiction" />
                            <FormControlLabel control={<Checkbox />} label="Non-Fiction" />
                            <FormControlLabel control={<Checkbox />} label="Science Fiction" />
                        </FormGroup>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <FormGroup>
                            <Typography variant="subtitle1">Price</Typography>
                            {/* Add a price range slider here */}
                        </FormGroup>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default BookFilters;
