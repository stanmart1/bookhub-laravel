import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'content', headerName: 'Content', width: 300 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const ContentModeration = ({ items }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={items} columns={columns} pageSize={5} />
    </div>
  );
};

export default ContentModeration;
