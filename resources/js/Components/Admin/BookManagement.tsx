import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';

const rows = [
    { id: 1, title: 'Book 1', author: 'Author 1', price: '$10.00' },
    { id: 2, title: 'Book 2', author: 'Author 2', price: '$15.00' },
];

const BookManagement = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
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
                    href={`/admin/books/${params.id}/edit`}
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

export default BookManagement;
