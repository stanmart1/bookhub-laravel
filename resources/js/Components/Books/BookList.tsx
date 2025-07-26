import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';

interface Book {
    id: number;
    title: string;
    author: string;
    cover_image: string;
}

interface BookListProps {
    books: Book[];
}

const BookList = ({ books }: BookListProps) => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {books.map((book, index) => (
                <React.Fragment key={book.id}>
                    <ListItem alignItems="flex-start" button component={Link} href={`/books/${book.id}`}>
                        <ListItemAvatar>
                            <Avatar alt={book.title} src={book.cover_image} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={book.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {book.author}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    {index < books.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}
        </List>
    );
};

export default BookList;
