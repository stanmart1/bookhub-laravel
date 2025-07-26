import React from 'react';
import { Container, Typography } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';
import BookGrid from '../../Components/Books/BookGrid';
import BookSearch from '../../Components/Books/BookSearch';

const books = [
    { id: 1, title: 'Book 1', author: 'Author 1', cover_image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Book 2', author: 'Author 2', cover_image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Book 3', author: 'Author 3', cover_image: 'https://via.placeholder.com/150' },
];

const Index = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Books
                </Typography>
                <BookSearch />
                <BookGrid books={books} />
            </Container>
        </AppLayout>
    );
};

export default Index;
