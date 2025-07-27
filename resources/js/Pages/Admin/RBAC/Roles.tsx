import React from 'react';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Roles = () => {
  const columns = [
    { field: 'name', headerName: 'Role Name', width: 150 },
    { field: 'permissions', headerName: 'Permissions', width: 300 },
  ];

  return (
    <Container>
      <DataGrid rows={[]} columns={columns} />
    </Container>
  );
};

export default Roles;
