import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 110 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const BillingHistory = ({ history }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={history} columns={columns} pageSize={5} />
    </div>
  );
};

export default BillingHistory;
