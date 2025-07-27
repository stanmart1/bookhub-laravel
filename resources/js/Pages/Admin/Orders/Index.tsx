import React from 'react';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Index = () => {
  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'customer', headerName: 'Customer', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Container>
      <DataGrid rows={[]} columns={columns} />
    </Container>
  );
};

export default Index;
