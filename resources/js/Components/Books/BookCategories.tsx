import React from 'react';
import { Chip, Stack } from '@mui/material';

interface BookCategoriesProps {
    categories: string[];
}

const BookCategories = ({ categories }: BookCategoriesProps) => {
    return (
        <Stack direction="row" spacing={1}>
            {categories.map((category) => (
                <Chip key={category} label={category} component="a" href={`/books/category/${category}`} clickable />
            ))}
        </Stack>
    );
};

export default BookCategories;
