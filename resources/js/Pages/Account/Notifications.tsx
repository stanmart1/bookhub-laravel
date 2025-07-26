import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import AppLayout from '../../Layouts/AppLayout';

const notifications = [
    { id: 1, message: 'Your order has shipped!' },
    { id: 2, message: 'A new book in your favorite genre is available.' },
    { id: 3, message: 'Your subscription is about to expire.' },
];

const Notifications = () => {
    return (
        <AppLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Notifications
                </Typography>
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id}>
                            <ListItemText primary={notification.message} />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </AppLayout>
    );
};

export default Notifications;
