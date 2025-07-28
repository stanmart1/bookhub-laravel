import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'message', headerName: 'Message', width: 300 },
  { field: 'date', headerName: 'Date', width: 150 },
];

const NotificationHistory = ({ notifications }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={notifications} columns={columns} pageSize={5} />
    </div>
  );
};

export default NotificationHistory;
