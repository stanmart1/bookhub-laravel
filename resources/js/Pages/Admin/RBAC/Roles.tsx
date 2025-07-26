import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@inertiajs/inertia-react';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        getActions: (params: any) => [
            <Button component={Link} href={`/admin/rbac/roles/${params.id}/edit`}>Edit</Button>
        ],
    },
];

const rows = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
];

const Roles = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Role Management
                </Typography>
                <Button component={Link} href="/admin/rbac/roles/create" variant="contained" sx={{ mb: 2 }}>
                    Create Role
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
            </Container>
        </AdminLayout>
    );
};

export default Roles;
