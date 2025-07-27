import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';

const fetchRoles = async () => {
  const { data } = await axios.get('/api/roles');
  return data;
};

const updateUserRole = async ({ userId, role }) => {
  await axios.post(`/api/users/${userId}/assign-role`, { role });
};

const RoleManager = ({ user }) => {
  const queryClient = useQueryClient();
  const { data: roles, isLoading, isError } = useQuery(['roles'], fetchRoles);
  const mutation = useMutation(updateUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const handleChange = (event) => {
    mutation.mutate({ userId: user.id, role: event.target.value });
  };

  if (isLoading) return <div>Loading roles...</div>;
  if (isError) return <div>Error loading roles.</div>;

  return (
    <Select value={user.roles[0]?.name || ''} onChange={handleChange}>
      {roles.map((role) => (
        <MenuItem key={role.id} value={role.name}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoleManager;
