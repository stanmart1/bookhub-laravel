import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'sales', headerName: 'Sales', type: 'number', width: 110 },
  { field: 'revenue', headerName: 'Revenue', type: 'number', width: 110 },
];

const BookPerformance = ({ books }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={books} columns={columns} pageSize={5} />
    </div>
  );
};

export default BookPerformance;
