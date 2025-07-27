import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

const fetchRoles = async () => {
  const { data } = await axios.get('/api/roles');
  return data;
};

const fetchPermissions = async () => {
    const { data } = await axios.get('/api/permissions');
    return data;
};

const updateRolePermissions = async ({ roleId, permissions }) => {
  await axios.post(`/api/roles/${roleId}/permissions`, { permissions });
};

const PermissionMatrix = () => {
  const queryClient = useQueryClient();
  const { data: roles, isLoading: rolesLoading, isError: rolesError } = useQuery(['roles'], fetchRoles);
  const { data: permissions, isLoading: permissionsLoading, isError: permissionsError } = useQuery(['permissions'], fetchPermissions);
  const mutation = useMutation(updateRolePermissions, {
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
    },
  });

  const handlePermissionChange = (roleId, permissionId, checked) => {
    const role = roles.find(r => r.id === roleId);
    const currentPermissions = role.permissions.map(p => p.id);
    const newPermissions = checked
        ? [...currentPermissions, permissionId]
        : currentPermissions.filter(id => id !== permissionId);
    mutation.mutate({ roleId, permissions: newPermissions });
  };

  if (rolesLoading || permissionsLoading) return <div>Loading...</div>;
  if (rolesError || permissionsError) return <div>Error loading data.</div>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Permission</TableCell>
            {roles.map((role) => (
              <TableCell key={role.id}>{role.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              {roles.map((role) => (
                <TableCell key={role.id}>
                  <Checkbox
                    checked={role.permissions.some(p => p.id === permission.id)}
                    onChange={(e) => handlePermissionChange(role.id, permission.id, e.target.checked)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PermissionMatrix;
