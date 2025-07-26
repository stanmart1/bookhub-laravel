import React from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';

const book = {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    cover_image: 'https://via.placeholder.com/300',
    description: 'This is a book description.',
};

const Show = () => {
    return (
        <AppLayout>
            <Container>
                <Card>
                    <CardMedia
                        component="img"
                        height="300"
                        image={book.cover_image}
                        alt={book.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {book.title}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            {book.author}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {book.description}
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }}>Add to Cart</Button>
                    </CardContent>
                </Card>
            </Container>
        </AppLayout>
    );
};

export default Show;
