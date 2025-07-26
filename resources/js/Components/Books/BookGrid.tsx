import React from 'react';
import { Grid } from '@mui/material';
import BookCard from './BookCard';

interface Book {
    id: number;
    title: string;
    author: string;
    cover_image: string;
}

interface BookGridProps {
    books: Book[];
}

const BookGrid = ({ books }: BookGridProps) => {
    return (
        <Grid container spacing={4}>
            {books.map((book) => (
                <Grid item key={book.id} xs={12} sm={6} md={4}>
                    <BookCard book={book} />
                </Grid>
            ))}
        </Grid>
    );
};

export default BookGrid;
