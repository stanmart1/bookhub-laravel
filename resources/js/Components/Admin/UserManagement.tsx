import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';

const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
];

const UserManagement = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 150 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params: any) => [
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    component={Link}
                    href={`/admin/users/${params.id}/edit`}
                />,
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => {
                        console.log('delete', params.id);
                    }}
                />,
            ],
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default UserManagement;
