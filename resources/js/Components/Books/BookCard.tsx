import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';

interface Book {
    id: number;
    title: string;
    author: string;
    cover_image: string;
}

interface BookCardProps {
    book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={book.cover_image}
                alt={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.author}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} href={`/books/${book.id}`}>View</Button>
                <Button size="small">Add to Cart</Button>
            </CardActions>
        </Card>
    );
};

export default BookCard;
