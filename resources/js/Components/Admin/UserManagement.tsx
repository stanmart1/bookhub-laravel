import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const fetchUsers = async () => {
  const { data } = await axios.get('/api/users');
  return data;
};

const UserManagement = () => {
  const { data: users, isLoading, isError } = useQuery(['users'], fetchUsers);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
  ];

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users.</div>;

  return <DataGrid rows={users} columns={columns} />;
};

export default UserManagement;
