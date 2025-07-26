import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import BookManagement from '../../../Components/Admin/BookManagement';
import { Link } from '@inertiajs/inertia-react';

const Index = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Book Management
                </Typography>
                <Button component={Link} href="/admin/books/create" variant="contained" sx={{ mb: 2 }}>
                    Create Book
                </Button>
                <BookManagement />
            </Container>
        </AdminLayout>
    );
};

export default Index;
