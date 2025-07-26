import React from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import BookGrid from '../../Components/Books/BookGrid';

const books = [
    { id: 1, title: 'Book 1', author: 'Author 1', cover_image: 'https://via.placeholder.com/150' },
];

const Category = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Category Name
                </Typography>
                <BookGrid books={books} />
            </Container>
        </AppLayout>
    );
};

export default Category;
