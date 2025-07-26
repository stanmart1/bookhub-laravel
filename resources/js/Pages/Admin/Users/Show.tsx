import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';

const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
};

const Show = () => {
    return (
        <AdminLayout>
            <Container>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {user.name}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            {user.email}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Role: {user.role}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default Show;
