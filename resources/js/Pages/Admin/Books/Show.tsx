import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';

const book = {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    price: '$10.00',
    description: 'This is a book description.',
};

const Show = () => {
    return (
        <AdminLayout>
            <Container>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {book.title}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            {book.author}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {book.price}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {book.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default Show;
