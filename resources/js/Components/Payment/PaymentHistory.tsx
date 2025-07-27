import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const PaymentHistory = ({ payments }) => {
  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return <DataGrid rows={payments} columns={columns} />;
};

export default PaymentHistory;
