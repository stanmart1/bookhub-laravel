import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const OrderHistory = () => {
  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return <DataGrid rows={[]} columns={columns} />;
};

export default OrderHistory;
