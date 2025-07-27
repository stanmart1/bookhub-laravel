import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Rank', width: 90 },
  { field: 'name', headerName: 'User', width: 150 },
  { field: 'points', headerName: 'Points', type: 'number', width: 110 },
];

const rows = [
  { id: 1, name: 'User 1', points: 1000 },
  { id: 2, name: 'User 2', points: 900 },
  { id: 3, name: 'User 3', points: 800 },
];

const Leaderboards = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default Leaderboards;
