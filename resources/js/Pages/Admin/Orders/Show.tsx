import React from 'react';
import { Container, Typography, Card, CardContent, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';

const order = {
    id: 1,
    customer: 'John Doe',
    date: '2023-10-27',
    status: 'Shipped',
    total: '$25.00',
    items: [
        { id: 1, name: 'Book 1', quantity: 1, price: '$10.00' },
        { id: 2, name: 'Book 2', quantity: 1, price: '$15.00' },
    ],
};

const Show = () => {
    return (
        <AdminLayout>
            <Container>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            Order #{order.id}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            {order.customer}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Date: {order.date}
                        </Typography>
                        <Typography variant="body1">
                            Status: {order.status}
                        </Typography>
                        <Typography variant="body1">
                            Total: {order.total}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 3 }}>
                            Items
                        </Typography>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    {item.name} (x{item.quantity}) - {item.price}
                                </li>
                            ))}
                        </ul>
                        <Typography variant="h6" sx={{ mt: 3 }}>
                            Order History
                        </Typography>
                        <Timeline>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Order Placed</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Payment Confirmed</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                </TimelineSeparator>
                                <TimelineContent>Shipped</TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default Show;
