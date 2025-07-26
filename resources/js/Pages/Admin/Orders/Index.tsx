import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@inertiajs/inertia-react';

const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        getActions: (params: any) => [
            <Button component={Link} href={`/admin/orders/${params.id}`}>View</Button>
        ],
    },
];

const rows = [
    { id: 1, customer: 'John Doe', date: '2023-10-27', status: 'Shipped', total: '$25.00' },
    { id: 2, customer: 'Jane Doe', date: '2023-10-25', status: 'Delivered', total: '$30.00' },
];

const Index = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Order Management
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
            </Container>
        </AdminLayout>
    );
};

export default Index;
