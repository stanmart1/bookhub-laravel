import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
];

const rows = [
    { id: 1, date: '2023-10-27', status: 'Shipped', total: '$25.00' },
    { id: 2, date: '2023-10-25', status: 'Delivered', total: '$30.00' },
];

const OrderHistory = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default OrderHistory;
