import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'feature', headerName: 'Feature', width: 150 },
    { field: 'book1', headerName: 'Book 1', width: 150 },
    { field: 'book2', headerName: 'Book 2', width: 150 },
];

const rows = [
    { id: 1, feature: 'Author', book1: 'Author A', book2: 'Author B' },
    { id: 2, feature: 'Price', book1: '$10', book2: '$12' },
    { id: 3, feature: 'Rating', book1: '4.5', book2: '4.2' },
];

const BookComparison = () => {
    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default BookComparison;
