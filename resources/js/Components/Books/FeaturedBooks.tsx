import React from 'react';
import { Grid, Typography } from '@mui/material';
import BookCard from './BookCard';

interface Book {
    id: number;
    title: string;
    author: string;
    cover_image: string;
}

interface FeaturedBooksProps {
    books: Book[];
}

const FeaturedBooks = ({ books }: FeaturedBooksProps) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Featured Books
            </Typography>
            <Grid container spacing={4}>
                {books.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default FeaturedBooks;
