import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const BookComparison = ({ books }) => {
  const columns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'author', headerName: 'Author', width: 150 },
  ];

  return <DataGrid rows={books} columns={columns} />;
};

export default BookComparison;
